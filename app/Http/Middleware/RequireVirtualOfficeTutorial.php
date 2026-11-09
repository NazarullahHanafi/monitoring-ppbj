<?php

namespace App\Http\Middleware;

use App\Services\VirtualOfficeTutorial;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireVirtualOfficeTutorial
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        // Gate document navigation only. Never interrupt saves, polling, exports,
        // authentication, security settings, or a page already open in an iframe.
        if (!config('virtual_office.tutorial_required') || !$user || !VirtualOfficeTutorial::eligible($user)
            || !$request->isMethod('GET') || $request->expectsJson() || $request->ajax()
            || $request->header('Sec-Fetch-Dest') === 'iframe'
            || $request->routeIs('virtual-office.index', 'virtual-office.tutorial.*', 'login', 'logout', 'password.*', 'verification.*', 'profile.*', 'owner.*', 'account.*', 'pr.quick-sign')
            || $request->routeIs('*.export*', '*.print*', '*.download*', '*.pdf*', '*.excel*', '*.template', '*.archive-attachment')) {
            return $next($request);
        }
        $page = $request->routeIs('dashboard', 'dashboard.index*', '*.index', 'torpr.create', 'ppbj.report', 'sp.trash', 'spph.trash');
        $document = str_contains($request->header('Accept', ''), 'text/html') && in_array('auth', $request->route()?->gatherMiddleware() ?? [], true);
        if (($page || $document) && !app(VirtualOfficeTutorial::class)->completed($user)) {
            return redirect()->route('virtual-office.tutorial.show')->header('Cache-Control', 'private, no-store');
        }
        return $next($request);
    }
}
