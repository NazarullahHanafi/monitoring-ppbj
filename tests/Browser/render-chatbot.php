<?php

require __DIR__.'/../../vendor/autoload.php';
$app = require __DIR__.'/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
Illuminate\Support\Facades\Cache::setDefaultDriver('array');
Illuminate\Support\Facades\DB::listen(static function (): void {
    throw new RuntimeException('Browser fixture must not query business records.');
});
Illuminate\Support\Facades\Auth::setUser(new App\Models\User([
    'name' => 'Synthetic Browser User', 'department' => 'operasional', 'role' => 'user',
]));
echo view('components.chatbot')->render();
