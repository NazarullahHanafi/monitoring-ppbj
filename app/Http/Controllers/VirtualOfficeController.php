<?php

namespace App\Http\Controllers;

use App\Services\VirtualOfficePresence;
use App\Services\VirtualOfficeAvatar;
use App\Services\VirtualOfficeActivity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class VirtualOfficeController extends Controller
{
    public function index(Request $request, VirtualOfficePresence $presence)
    {
        $this->authorizeDepartment($request);

        $profile=$this->profile($request->user());
        $officeConfig = ['initial' => $presence->snapshot($request->user()),
            'feedUrl' => route('virtual-office.presence', [], false), 'canChat' => ! $request->user()->isReadOnly(),
            'profileUrl' => '/virtual-office/avatar', 'myId' => $request->user()->id,
            'myProfile' => $profile, 'avatarOptions' => VirtualOfficeAvatar::options(),
            'costumes'=>VirtualOfficeAvatar::costumes(),
            'hologramTools'=>$this->hologramTools($request->user()),
            'canPilot'=>\App\Services\VirtualOfficePilot::allowed($request->user()),
            'canCombat'=>\App\Services\VirtualOfficeRecreation::allowed($request->user())&&!\Illuminate\Support\Facades\Cache::get('simonpr:read_only_mode',false),
            'myHome'=>\App\Services\VirtualOfficeHomes::own($request->user()),
            'homePlots'=>count(\App\Services\VirtualOfficeHomes::slots()),
            'privateSelf'=>!$request->user()->shouldDisplayInPresence()?['id'=>$request->user()->id,'name'=>'Anda · privat','department'=>$request->user()->department,'state'=>'online','is_me'=>true,'avatar'=>$profile['avatar'],'private'=>true]:null,
            'canConfigureWorld' => \App\Services\VirtualOfficeWorld::canConfigure($request->user()),
            'canMeet' => \App\Services\VirtualOfficeMeetings::eligible($request->user())];

        return response()->view('virtual-office.index', compact('officeConfig'))
            ->header('Cache-Control', 'private, no-store');
    }

    public function presence(Request $request, VirtualOfficePresence $presence)
    {
        $this->authorizeDepartment($request);

        return response()->json($presence->snapshot($request->user()))->header('Cache-Control', 'private, no-store');
    }

    private function hologramTools(User $user): array
    {
        $tool = fn (string $id, string $title, string $description) => ['id'=>$id,'title'=>$title,'description'=>$description,
            'url'=>route('virtual-office.hologram', ['tool'=>$id], false)];
        $tools = [];
        if ($user->department === 'operasional') {
            if (! $user->isReadOnly() && ! Cache::get('simonpr:read_only_mode', false)) {
                $tools[]=$tool('create', 'Tambah TOR PR', 'Susun pengadaan baru dari ruang kerja Anda.');
            }
            $tools[]=$tool('torpr', 'Daftar TOR PR', 'Buka dokumen, draft, dan progres pengajuan.');
        }
        $tools[]=$tool('tracking', 'Tracking PR', 'Telusuri perjalanan PR dan PPBJ.');
        return $tools;
    }

    public function hologram(Request $request, string $tool)
    {
        $this->authorizeDepartment($request);
        abort_unless(in_array($tool, ['create','torpr','tracking'], true), 404);
        if ($tool !== 'tracking') {
            abort_unless($request->user()->department === 'operasional', 403);
        }
        if ($tool === 'create') {
            abort_if($request->user()->isReadOnly() || Cache::get('simonpr:read_only_mode', false), 403);
        }
        // A presentation context only: writes still use the original routes,
        // CSRF, department, ownership and read-only checks.
        $request->attributes->set('office_hologram', true);
        $request->attributes->set('office_hologram_create', $tool === 'create');
        $view = $tool === 'tracking'
            ? app(TrackingPrController::class)->hologram($request)
            : app(TorprController::class)->index($request);
        return response()->view($view->name(), $view->getData())->header('Cache-Control', 'private, no-store');
    }

    private function profile(User $user): array
    {
        $row = DB::table('virtual_office_profiles')->where('user_id', $user->id)->first();
        return ['avatar' => VirtualOfficeAvatar::sanitize($row?->avatar, $user->gender, $user->id),
            'share_activity' => $row ? (bool) $row->share_activity : true, 'version' => $row?->version ?? 0];
    }

    public function saveAvatar(Request $request)
    {
        $this->authorizeDepartment($request);
        $rules = ['user_id' => ['prohibited'], 'id' => ['prohibited'], 'version' => ['required', 'integer', 'min:0'],
            'share_activity' => ['required', 'boolean'], 'avatar' => ['required', 'array:'.implode(',', array_keys(VirtualOfficeAvatar::options()))]];
        foreach (VirtualOfficeAvatar::options() as $key => $options) {
            $rules['avatar.'.$key] = [$key==='costume'?'sometimes':'required', Rule::in($options)];
        }
        $data = $request->validate($rules);
        $data['avatar']['costume']??='none';
        $id = $request->user()->id;
        // A row lock plus insertOrIgnore serializes concurrent first saves.
        DB::transaction(function () use ($data, $id): void {
            DB::table('virtual_office_profiles')->insertOrIgnore(['user_id' => $id, 'avatar' => json_encode(VirtualOfficeAvatar::defaults()),
                'share_activity' => true, 'version' => 0, 'created_at' => now(), 'updated_at' => now()]);
            $row = DB::table('virtual_office_profiles')->where('user_id', $id)->lockForUpdate()->first();
            abort_unless((int) $row->version === (int) $data['version'], 409, 'Avatar berubah di tab lain. Muat ulang sebelum menyimpan.');
            DB::table('virtual_office_profiles')->where('user_id', $id)->update(['avatar' => json_encode($data['avatar']),
                'share_activity' => $data['share_activity'], 'version' => $row->version + 1, 'updated_at' => now()]);
        });
        Cache::forget(VirtualOfficePresence::DIRECTORY_KEY);
        return response()->json($this->profile($request->user()))->header('Cache-Control', 'private, no-store');
    }

    public function activity(Request $request, User $user)
    {
        $this->authorizeDepartment($request);
        abort_unless($user->is_active && $user->shouldDisplayInPresence() && in_array($user->department, ['umum', 'operasional'], true), 404);
        $profile = $this->profile($user);
        $me = (int) $user->id === (int) $request->user()->id;
        abort_unless($me || $profile['share_activity'], 403, 'Anggota ini menonaktifkan berbagi aktivitas menu.');
        $data = $request->validate(['date' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:'.now('Asia/Jakarta')->subDays(29)->toDateString(), 'before_or_equal:'.now('Asia/Jakarta')->toDateString()]]);
        $day = \Carbon\CarbonImmutable::parse($data['date'] ?? now('Asia/Jakarta')->toDateString(), 'Asia/Jakarta')->startOfDay();
        $start = $day->setTimezone(config('app.timezone'));
        $end = $day->addDay()->setTimezone(config('app.timezone'));
        $visits = DB::table('virtual_office_visits')->where('user_id', $user->id)->where('visited_at', '>=', $start)
            ->where('visited_at', '<', $end)->orderByDesc('visited_at')->orderByDesc('id')->limit(101)->get(['menu', 'visited_at']);
        return response()->json(['date' => $day->toDateString(), 'timezone' => 'Asia/Jakarta', 'limited' => $visits->count() > 100,
            'visits' => $visits->take(100)->filter(fn ($v) => isset(VirtualOfficeActivity::MENUS[$v->menu]))->map(fn ($v) => [
                'menu' => VirtualOfficeActivity::MENUS[$v->menu], 'at' => \Carbon\Carbon::parse($v->visited_at, config('app.timezone'))->toIso8601String(),
            ])->values()])->header('Cache-Control', 'private, no-store');
    }

    private function authorizeDepartment(Request $request): void
    {
        abort_unless(in_array($request->user()?->department, ['umum', 'operasional'], true), 403);
    }
}
