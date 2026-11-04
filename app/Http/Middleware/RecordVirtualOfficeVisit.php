<?php

namespace App\Http\Middleware;

use App\Services\VirtualOfficeActivity;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RecordVirtualOfficeVisit
{
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

    public function terminate(Request $request, Response $response): void
    {
        $menu = VirtualOfficeActivity::menuForRoute($request->route()?->getName());
        if (! $menu || ! $request->isMethod('GET') || $request->expectsJson()
            || $response->getStatusCode() !== 200 || ! str_contains($response->headers->get('Content-Type', ''), 'text/html')
            || ! $request->user()) {
            return;
        }
        try {
            app(VirtualOfficeActivity::class)->record($request->user(), $menu);
        } catch (\Throwable $e) {
            // Personal presence must never interrupt a business page.
            report($e);
        }
    }
}
