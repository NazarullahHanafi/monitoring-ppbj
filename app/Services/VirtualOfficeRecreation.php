<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class VirtualOfficeRecreation
{
    public const DESTINATIONS = ['bar' => 'Maison du Rivage · bar', 'disco' => 'Éclipse · lantai dansa', 'beach' => 'Pantai & kursi santai', 'garden' => 'Taman bunga', 'terrace' => 'Teras pegunungan', 'lounge' => 'Lounge kantor'];

    public static function catalog(): array
    {
        $groups = [
            'Kopi & teh' => [['espresso','Espresso',18],['cappuccino','Cappuccino',28],['latte','Café latte',30],['chocolat','Chocolat chaud',32],['matcha','Matcha latte',30],['earl-grey','Earl Grey',22],['mint-tea','Thé à la menthe',24]],
            'Minuman segar' => [['mineral','Eau minérale',10],['orange','Jus jeruk',25],['mango','Jus mangga',28],['coconut','Kelapa muda',30],['lemonade','Limonade maison',25],['berry','Berry spritz · tanpa alkohol',38],['mojito','Virgin mojito',38],['tropical','Tropical mocktail',42],['iced-tea','Es teh',12],['soda','Soda citron',20]],
            'Boulangerie & dessert' => [['croissant','Croissant au beurre',24],['pain-chocolat','Pain au chocolat',28],['baguette','Baguette & beurre',25],['macaron','Macarons assortis',45],['creme-brulee','Crème brûlée',48],['tarte-tatin','Tarte Tatin',52],['mousse','Mousse au chocolat',42],['crepe','Crêpe fraise',40]],
            'Cuisine française' => [['quiche','Quiche lorraine',65],['ratatouille','Ratatouille provençale',72],['soupe','Soupe à l’oignon',58],['confit','Confit de canard',145],['boeuf','Bœuf bourguignon',155],['poulet','Poulet rôti',110],['saumon','Saumon grillé',135],['salade','Salade niçoise',68],['gratin','Gratin dauphinois',62]],
            'Rasa Nusantara' => [['nasi-padang','Nasi Padang lengkap',75],['ayam-pop','Ayam pop & sambal',62],['rendang','Rendang sapi',85],['dendeng','Dendeng balado',78],['gulai','Gulai tunjang',72],['sate-padang','Sate Padang',58],['nasi-goreng','Nasi goreng kampung',48],['soto','Soto ayam',45],['gado-gado','Gado-gado',42],['pisang','Pisang goreng',22]],
        ];
        $items = [];
        foreach ($groups as $group => $rows) foreach ($rows as [$id, $name, $price]) $items[$id] = compact('id', 'name', 'price', 'group') + ['kind' => in_array($group, ['Kopi & teh', 'Minuman segar']) ? 'drink' : 'food'];
        return $items;
    }

    public static function allowed(?User $user): bool
    {
        return $user && $user->is_active && in_array($user->department, ['umum', 'operasional'], true) && ! $user->isReadOnly();
    }

    // A wallet row lock serializes both grants and purchases. Calendar date is WIB,
    // so refreshes, multiple devices, and repeated Login events cannot farm money.
    public function daily(User $user): void
    {
        if (! self::allowed($user) || Cache::get('simonpr:read_only_mode', false)) return;
        DB::transaction(function () use ($user) {
            DB::table('virtual_office_wallets')->insertOrIgnore(['user_id' => $user->id, 'balance' => 0, 'created_at' => now(), 'updated_at' => now()]);
            $wallet = DB::table('virtual_office_wallets')->where('user_id', $user->id)->lockForUpdate()->first();
            $day = now('Asia/Jakarta')->toDateString();
            if ($wallet->awarded_on && $wallet->awarded_on >= $day) return;
            $balance = (int) $wallet->balance + 1000;
            DB::table('virtual_office_ledger')->insert(['user_id' => $user->id, 'reference' => 'daily:'.$day, 'amount' => 1000, 'balance' => $balance, 'created_at' => now()]);
            DB::table('virtual_office_wallets')->where('user_id', $user->id)->update(['balance' => $balance, 'awarded_on' => $day, 'updated_at' => now()]);
        }, 3);
    }

    public function account(User $user): array
    {
        $wallet = DB::table('virtual_office_wallets')->where('user_id', $user->id)->first();
        return ['balance' => (int) ($wallet->balance ?? 0), 'awarded_on' => $wallet?->awarded_on, 'currency' => 'virtual USD',
            'orders' => DB::table('virtual_office_orders')->where('user_id', $user->id)->where('remaining', '>', 0)->orderByDesc('created_at')->limit(60)->get(),
            'receipts' => DB::table('virtual_office_tabs')->where('user_id', $user->id)->orderByDesc('created_at')->limit(10)->get(['id', 'items', 'destination', 'total', 'created_at']),
            'ledger' => DB::table('virtual_office_ledger')->where('user_id', $user->id)->orderByDesc('id')->limit(15)->get(['reference', 'amount', 'balance', 'created_at'])];
    }

    public function order(User $user, array $data): array
    {
        $item = self::catalog()[$data['item']];
        DB::transaction(function () use ($user, $data, $item) {
            $wallet = DB::table('virtual_office_wallets')->where('user_id', $user->id)->lockForUpdate()->first();
            abort_unless($wallet, 409, 'Buka dompet terlebih dahulu.');
            $previous = DB::table('virtual_office_orders')->where('id', $data['request_id'])->first();
            if ($previous) {
                abort_unless((int) $previous->user_id === (int) $user->id, 404);
                abort_unless($previous->item === $data['item'] && (int) $previous->quantity === (int) $data['quantity'] && $previous->destination === $data['destination'], 409, 'Nomor pesanan sudah digunakan.');
                return;
            }
            $cost = $item['price'] * $data['quantity'];
            abort_unless($wallet->balance >= $cost, 422, 'Saldo virtual tidak cukup. Pilih menu lain atau tunggu bonus hari berikutnya.');
            abort_if(DB::table('virtual_office_orders')->where('user_id', $user->id)->where('remaining', '>', 0)->count() >= 60, 422, 'Nikmati pesanan yang tersimpan sebelum membeli lagi.');
            $balance = (int) $wallet->balance - $cost;
            DB::table('virtual_office_orders')->insert(['id' => $data['request_id'], 'user_id' => $user->id, 'item' => $item['id'], 'price' => $item['price'], 'quantity' => $data['quantity'], 'remaining' => $data['quantity'], 'destination' => $data['destination'], 'created_at' => now(), 'updated_at' => now()]);
            DB::table('virtual_office_wallets')->where('user_id', $user->id)->update(['balance' => $balance, 'updated_at' => now()]);
            DB::table('virtual_office_ledger')->insert(['user_id' => $user->id, 'reference' => 'order:'.$data['request_id'], 'amount' => -$cost, 'balance' => $balance, 'created_at' => now()]);
        }, 3);
        return $this->account($user);
    }

    public function checkout(User $user, array $data): array
    {
        $catalog = self::catalog();
        $lines = collect($data['items'])->map(fn ($line) => ['item' => $line['item'], 'quantity' => (int) $line['quantity']])->sortBy('item')->values()->all();
        $fingerprint = hash('sha256', json_encode([$lines, $data['destination']]));
        DB::transaction(function () use ($user, $data, $lines, $catalog, $fingerprint) {
            $wallet = DB::table('virtual_office_wallets')->where('user_id', $user->id)->lockForUpdate()->first();
            abort_unless($wallet, 409, 'Buka menu bar untuk memuat dompet terlebih dahulu.');
            $previous = DB::table('virtual_office_tabs')->where('id', $data['request_id'])->first();
            if ($previous) {
                abort_unless((int) $previous->user_id === (int) $user->id, 404);
                abort_unless(hash_equals($previous->fingerprint, $fingerprint), 409, 'Nomor pembayaran sudah digunakan untuk keranjang berbeda.');
                return;
            }
            $total = array_sum(array_map(fn ($line) => $catalog[$line['item']]['price'] * $line['quantity'], $lines));
            abort_unless($wallet->balance >= $total, 422, 'Saldo virtual tidak cukup untuk keranjang ini. Kurangi jumlah atau pilih menu lain.');
            $stored = DB::table('virtual_office_orders')->where('user_id', $user->id)->where('remaining', '>', 0)->count();
            abort_if($stored + count($lines) > 60, 422, 'Nikmati pesanan tersimpan sebelum menambah pesanan baru.');
            $receipt = [];
            foreach ($lines as $line) {
                $item = $catalog[$line['item']];
                $orderId = \Ramsey\Uuid\Uuid::uuid5(\Ramsey\Uuid\Uuid::NAMESPACE_URL, $user->id.':'.$data['request_id'].':'.$item['id'])->toString();
                DB::table('virtual_office_orders')->insert(['id' => $orderId, 'user_id' => $user->id, 'item' => $item['id'], 'price' => $item['price'], 'quantity' => $line['quantity'], 'remaining' => $line['quantity'], 'destination' => $data['destination'], 'created_at' => now(), 'updated_at' => now()]);
                $receipt[] = ['item' => $item['id'], 'name' => $item['name'], 'price' => $item['price'], 'quantity' => $line['quantity']];
            }
            $balance = (int) $wallet->balance - $total;
            DB::table('virtual_office_tabs')->insert(['id' => $data['request_id'], 'user_id' => $user->id, 'fingerprint' => $fingerprint, 'items' => json_encode($receipt), 'destination' => $data['destination'], 'total' => $total, 'created_at' => now()]);
            DB::table('virtual_office_wallets')->where('user_id', $user->id)->update(['balance' => $balance, 'updated_at' => now()]);
            DB::table('virtual_office_ledger')->insert(['user_id' => $user->id, 'reference' => 'checkout:'.$data['request_id'], 'amount' => -$total, 'balance' => $balance, 'created_at' => now()]);
        }, 3);
        return $this->account($user) + ['receipt_id' => $data['request_id']];
    }

    public function consume(User $user, string $id, string $destination, string $requestId): array
    {
        $activity = DB::transaction(function () use ($user, $id, $destination, $requestId) {
            $row = DB::table('virtual_office_orders')->where('id', $id)->where('user_id', $user->id)->lockForUpdate()->first();
            abort_unless($row, 404);
            $previous = DB::table('virtual_office_servings')->where('id', $requestId)->first();
            if ($previous) abort_unless((int) $previous->user_id === (int) $user->id && $previous->order_id === $id && $previous->destination === $destination, 409);
            else {
                abort_unless($row->remaining > 0, 409, 'Pesanan sudah habis.');
                DB::table('virtual_office_servings')->insert(['id' => $requestId, 'user_id' => $user->id, 'order_id' => $id, 'destination' => $destination, 'created_at' => now()]);
                DB::table('virtual_office_orders')->where('id', $id)->update(['remaining' => $row->remaining - 1, 'updated_at' => now()]);
            }
            return ['destination' => $destination, 'kind' => self::catalog()[$row->item]['kind'], 'item' => $row->item, 'order_id' => $id];
        });
        $this->activity($user, $activity);
        return $this->account($user);
    }

    public function activity(User $user, array $activity): void
    {
        // The hidden owner may use personal controls without appearing in the roster.
        Cache::put('office:recreation:'.$user->id, $activity + ['until' => now()->addMinutes(15)->timestamp], 900);
    }
}
