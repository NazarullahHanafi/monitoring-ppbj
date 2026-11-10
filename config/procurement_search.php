<?php

return [
    'enabled' => env('PROCUREMENT_SEARCH_ENABLED', true),
    'archive_root' => env('PROCUREMENT_SEARCH_ARCHIVE_ROOT', ''),
    'node' => env('PROCUREMENT_OCR_NODE', 'node'),
    'languages' => env('PROCUREMENT_OCR_LANG_PATH', public_path('assets/document-reader/v1/lang')),
    'max_bytes' => 30 * 1024 * 1024,
    'max_pixels' => 4000000,
    'max_text' => 400000,
    'pages_per_pass' => 2,
    'process_timeout' => 65,
    'max_rss_mb' => 448,
    'source_batch' => 80,
    'archive_fresh_minutes' => 15,
];
