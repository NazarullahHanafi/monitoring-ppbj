<?php

putenv('SESSION_DRIVER=array');
putenv('CACHE_STORE=array');
$root = dirname(__DIR__, 2);
require $root.'/vendor/autoload.php';
$app = require $root.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$app['url']->forceRootUrl('https://sp-master-fixture.test');
$app['url']->forceScheme('https');
$app['view']->share('errors', new Illuminate\Support\ViewErrorBag);
$option = new App\Models\SpMasterOption;
$option->setRawAttributes(['id' => 1, 'type' => 'jabatan_sci', 'nama' => 'Audit & "Name" <img src=x onerror=unsafe=1>', 'is_active' => true, 'updated_at' => '2026-11-16 10:00:00'], true);
$options = new Illuminate\Pagination\LengthAwarePaginator(collect([$option]), 1, 20, 1, ['path' => '/sp-master-options']);
$types = ['bidang_ip_itu' => 'Bidang IP / ITU', 'bidang_pr' => 'Bidang PR', 'penandatangan_sci' => 'Penandatangan SCI', 'jabatan_sci' => 'Jabatan SCI'];
$blade = file_get_contents($root.'/resources/views/sp_master_options/index.blade.php');
$start = strpos($blade, "@section('content')") + strlen("@section('content')");
$end = strpos($blade, "    @push('scripts')", $start);
if ($start === false || $end === false) {
    throw new RuntimeException('Fixture section missing');
}
$body = Illuminate\Support\Facades\Blade::render(substr($blade, $start, $end - $start), [
    'options' => $options, 'types' => $types, 'type' => 'jabatan_sci', 'search' => '',
    'stats' => ['total' => 1, 'jabatan_sci' => 1, 'bidang_pr' => 0, 'bidang_ip_itu' => 0, 'penandatangan_sci' => 0],
]);
$manifest = json_decode(file_get_contents($root.'/public/build/manifest.json'), true);
preg_match('/<style>[\s\S]*?<\/style>/', $blade, $style);
$html = '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="synthetic-csrf"><link rel="stylesheet" href="/build/'.$manifest['resources/css/app.css']['file'].'"><link rel="stylesheet" href="/assets/app/form-ux.css"><link rel="stylesheet" href="/assets/vendor/ui/sweetalert2.min.css">'.($style[0] ?? '').'</head><body>'.$body.'<script src="/assets/vendor/ui/sweetalert2.all.min.js"></script><script src="/assets/app/form-ux.js"></script><script src="/assets/app/sp-master-options.js"></script></body></html>';
file_put_contents($root.'/tmp/sp-master-fixture.html', $html);
