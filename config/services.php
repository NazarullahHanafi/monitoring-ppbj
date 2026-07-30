<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'groq' => [
        'api_key' => env('GROQ_API_KEY'),
        'model' => env('GROQ_MODEL', 'llama-3.1-70b-versatile'),
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    ],

    'pr_archive' => [
        'base_url' => env('ARCHIVE_API_URL'),
        'token' => env('ARCHIVE_API_TOKEN'),
        'pr_path' => env('ARCHIVE_API_PR_PATH', '/api/pr/documents'),
        'connect_timeout' => env('ARCHIVE_API_CONNECT_TIMEOUT', 2),
        'timeout' => env('ARCHIVE_API_TIMEOUT', 5),
        'cache_seconds' => env('ARCHIVE_API_CACHE_SECONDS', 300),
    ],

    'telegram' => [
        'bot_token' => env('TELEGRAM_BOT_TOKEN'),
        'allowed_chat_ids' => env('TELEGRAM_ALLOWED_CHAT_IDS', env('TELEGRAM_ALLOWED_CHAT_ID', '')),
        'notify_chat_ids' => env('TELEGRAM_NOTIFY_CHAT_IDS', env('TELEGRAM_ALLOWED_CHAT_IDS', env('TELEGRAM_ALLOWED_CHAT_ID', ''))),
        'owner_chat_ids' => env('TELEGRAM_OWNER_CHAT_IDS', env('TELEGRAM_ALLOWED_CHAT_ID', '')),
        'webhook_secret' => env('TELEGRAM_WEBHOOK_SECRET'),
        'timeout' => env('TELEGRAM_TIMEOUT', 5),
    ],

];
