@if(Route::has('virtual-office.index') && in_array(auth()->user()?->department, ['umum', 'operasional'], true))
<a href="{{ route('virtual-office.index') }}" class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->routeIs('virtual-office.*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20' }}">
    <span class="icon-box text-xl" aria-hidden="true">&#9672;</span><span class="nav-text font-medium">Kantor Virtual</span>
</a>
@endif
