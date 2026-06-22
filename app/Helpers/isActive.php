@php
function isActive($route, $output = true) {
    if (request()->routeIs($route) || request()->is($route)) {
        return $output ? 'active' : '';
    }
    return '';
}
@endphp