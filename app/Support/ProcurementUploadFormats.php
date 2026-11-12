<?php

namespace App\Support;

final class ProcurementUploadFormats
{
    public const FORMATS = [
        'pdf' => ['mime' => 'application/pdf', 'reader' => 'pdf'],
        'docx' => ['mime' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'reader' => 'office'],
        'xlsx' => ['mime' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'reader' => 'office'],
        'pptx' => ['mime' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'reader' => 'office'],
        'odt' => ['mime' => 'application/vnd.oasis.opendocument.text', 'reader' => 'office'],
        'ods' => ['mime' => 'application/vnd.oasis.opendocument.spreadsheet', 'reader' => 'office'],
        'odp' => ['mime' => 'application/vnd.oasis.opendocument.presentation', 'reader' => 'office'],
        'doc' => ['mime' => 'application/msword', 'reader' => 'manual'],
        'xls' => ['mime' => 'application/vnd.ms-excel', 'reader' => 'manual'],
        'ppt' => ['mime' => 'application/vnd.ms-powerpoint', 'reader' => 'manual'],
        'rtf' => ['mime' => 'application/rtf', 'reader' => 'manual'],
        'txt' => ['mime' => 'text/plain', 'reader' => 'text'],
        'csv' => ['mime' => 'text/csv', 'reader' => 'text'],
        'jpg' => ['mime' => 'image/jpeg', 'reader' => 'image'],
        'jpeg' => ['mime' => 'image/jpeg', 'reader' => 'image'],
        'png' => ['mime' => 'image/png', 'reader' => 'image'],
        'webp' => ['mime' => 'image/webp', 'reader' => 'image'],
        'gif' => ['mime' => 'image/gif', 'reader' => 'image'],
        'bmp' => ['mime' => 'image/bmp', 'reader' => 'image'],
        'tif' => ['mime' => 'image/tiff', 'reader' => 'manual'],
        'tiff' => ['mime' => 'image/tiff', 'reader' => 'manual'],
    ];

    public static function accept(): string
    {
        return implode(',', array_map(fn ($extension) => '.'.$extension, array_keys(self::FORMATS)));
    }
}
