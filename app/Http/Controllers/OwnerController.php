<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class OwnerController extends Controller
{
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'database' => DB::connection()->getDatabaseName(),
            'environment' => app()->environment(),
            'debug' => config('app.debug') ? 'ON' : 'OFF',
            'owner_email' => auth()->user()->email,
        ];

        return view('owner.index', compact('stats'));
    }
}
