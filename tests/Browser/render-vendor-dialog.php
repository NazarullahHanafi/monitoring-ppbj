<?php

// Render the real Blade dialog for the standalone Playwright fixture.
$root = dirname(__DIR__, 2);
require $root.'/vendor/autoload.php';
$app = require $root.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
if (! is_dir($root.'/tmp')) {
    mkdir($root.'/tmp', 0700, true);
}
file_put_contents($root.'/tmp/vendor-dialog.html', view('vendor.documents', ['vendorDocumentsReadOnly' => false])->render());
