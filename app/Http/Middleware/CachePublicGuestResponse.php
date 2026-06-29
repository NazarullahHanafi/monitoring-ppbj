<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CachePublicGuestResponse
{
    private const TTL_SECONDS = 120;

    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->isCacheableRequest($request)) {
            return $next($request);
        }

        $key = $this->cacheKey($request);
        $cached = Cache::get($key);

        if (is_array($cached) && isset($cached['content'])) {
            return response(
                $this->restoreDynamicTokens($cached['content']),
                $cached['status'] ?? 200,
                array_merge($cached['headers'] ?? [], [
                    'X-SIMONPR-Page-Cache' => 'HIT',
                ])
            );
        }

        /** @var Response $response */
        $response = $next($request);

        if ($this->isCacheableResponse($request, $response)) {
            Cache::put($key, [
                'status' => $response->getStatusCode(),
                'headers' => $this->cacheableHeaders($response),
                'content' => $this->maskDynamicTokens($response->getContent() ?: ''),
            ], self::TTL_SECONDS);

            $response->headers->set('X-SIMONPR-Page-Cache', 'MISS');
        }

        return $response;
    }

    private function isCacheableRequest(Request $request): bool
    {
        if (! $request->isMethod('GET') || $request->ajax() || Auth::check()) {
            return false;
        }

        if ($request->session()->has('errors') || $request->session()->has('_old_input') || $request->session()->has('status')) {
            return false;
        }

        return in_array('/'.trim($request->path(), '/'), [
            '/',
            '/about',
            '/services',
            '/track',
            '/login',
        ], true);
    }

    private function isCacheableResponse(Request $request, Response $response): bool
    {
        if ($response->getStatusCode() !== 200 || ! str_contains((string) $response->headers->get('content-type'), 'text/html')) {
            return false;
        }

        return ! ($request->session()->has('errors') || $request->session()->has('_old_input') || $request->session()->has('status'));
    }

    private function cacheKey(Request $request): string
    {
        $query = $request->query();
        ksort($query);

        return 'guest_page_cache:v1:'.sha1($request->path().'|'.http_build_query($query));
    }

    private function cacheableHeaders(Response $response): array
    {
        $headers = [];

        foreach (['content-type'] as $name) {
            if ($response->headers->has($name)) {
                $headers[$name] = $response->headers->get($name);
            }
        }

        return $headers;
    }

    private function maskDynamicTokens(string $content): string
    {
        $content = preg_replace('/(<meta\s+name="csrf-token"\s+content=")[^"]*(")/i', '$1__SIMONPR_CSRF_TOKEN__$2', $content) ?? $content;
        $content = preg_replace('/(<input[^>]+name="_token"[^>]+value=")[^"]*(")/i', '$1__SIMONPR_CSRF_TOKEN__$2', $content) ?? $content;

        return $content;
    }

    private function restoreDynamicTokens(string $content): string
    {
        return str_replace('__SIMONPR_CSRF_TOKEN__', csrf_token(), $content);
    }
}
