<?php

// Browser fixture only. Refuse to run against an on-disk or production database.
foreach (['APP_ENV' => 'testing', 'DB_CONNECTION' => 'sqlite', 'DB_DATABASE' => ':memory:', 'CACHE_STORE' => 'array', 'SESSION_DRIVER' => 'array', 'QUEUE_CONNECTION' => 'sync', 'BCRYPT_ROUNDS' => '4'] as $key => $value) {
    putenv($key.'='.$value);
    $_ENV[$key] = $value;
    $_SERVER[$key] = $value;
}
require __DIR__.'/../../vendor/autoload.php';
$app = require __DIR__.'/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
config(['database.default' => 'sqlite', 'database.connections.sqlite.database' => ':memory:', 'cache.default' => 'array', 'session.driver' => 'array', 'app.asset_url' => null, 'app.url' => 'https://sp-lookups.test']);
Illuminate\Support\Facades\DB::purge('sqlite');
$db = Illuminate\Support\Facades\DB::connection();
if ($db->getDriverName() !== 'sqlite' || $db->getDatabaseName() !== ':memory:') {
    throw new RuntimeException('Browser fixture requires in-memory SQLite');
}
Illuminate\Support\Facades\Cache::setDefaultDriver('array');
Illuminate\Support\Facades\Http::preventStrayRequests();
Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
Illuminate\Support\Facades\URL::forceRootUrl('https://sp-lookups.test');
Illuminate\Support\Facades\URL::forceScheme('https');
$actor = App\Models\User::factory()->create(['name' => 'Penguji Form SP', 'department' => 'umum', 'role' => 'superadmin']);
Illuminate\Support\Facades\Auth::setUser($actor);
$request = Illuminate\Http\Request::create('https://sp-lookups.test/sp');
$request->setUserResolver(fn () => $actor);
$request->setRouteResolver(fn () => $app['router']->getRoutes()->getByName('sp.index'));
$app->instance('request', $request);
$app['view']->share('errors', new Illuminate\Support\ViewErrorBag);
$html = app(App\Http\Controllers\SpController::class)->index($request)->render();
$target = __DIR__.'/../../tmp/sp-lookup-fixture.html';
file_put_contents($target, $html);
echo 'SP_LOOKUP_FIXTURE_OK bytes='.strlen($html)." database=sqlite_memory\n";
