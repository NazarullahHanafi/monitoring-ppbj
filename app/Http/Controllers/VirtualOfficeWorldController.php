<?php

namespace App\Http\Controllers;

use App\Services\VirtualOfficeWorld;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class VirtualOfficeWorldController extends Controller
{
    public function save(Request $request, VirtualOfficeWorld $world)
    {
        abort_unless(VirtualOfficeWorld::canConfigure($request->user()), 403);
        $data = $request->validate(['version' => ['required', 'integer', 'min:0'],
            'settings' => ['required', 'array:landscape,weather,cycle_hours,particles,mountains,clouds'],
            'settings.landscape' => ['required', Rule::in(['alps', 'village', 'nordic'])],
            'settings.weather' => ['required', Rule::in(['auto', 'clear', 'rain', 'snow', 'aurora', 'mist'])],
            'settings.cycle_hours' => ['required', 'integer', Rule::in([2, 3, 4, 6])],
            'settings.particles' => ['required', Rule::in(['low', 'medium'])],
            'settings.mountains' => ['required', 'boolean'], 'settings.clouds' => ['required', 'boolean']]);
        $data['settings']['mountains'] = $request->boolean('settings.mountains');
        $data['settings']['clouds'] = $request->boolean('settings.clouds');
        $data['settings']['cycle_hours'] = (int) $data['settings']['cycle_hours'];
        DB::transaction(function () use ($data) {
            DB::table('virtual_office_world')->insertOrIgnore(['id' => 1, 'settings' => json_encode(VirtualOfficeWorld::defaults()), 'version' => 0, 'created_at' => now(), 'updated_at' => now()]);
            $row = DB::table('virtual_office_world')->where('id', 1)->lockForUpdate()->first();
            abort_unless((int) $row->version === (int) $data['version'], 409, 'Kawasan diubah admin lain. Muat ulang pengaturan.');
            DB::table('virtual_office_world')->where('id', 1)->update(['settings' => json_encode($data['settings']), 'version' => $row->version + 1, 'updated_at' => now()]);
        });
        Cache::forget(VirtualOfficeWorld::KEY);
        return response()->json($world->snapshot())->header('Cache-Control', 'private, no-store');
    }
}
