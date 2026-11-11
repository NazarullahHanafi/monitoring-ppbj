<?php

namespace App\Services;

use ZipArchive;

/** Extract one bounded embedded asset without ever unpacking ZIP paths. */
class ProcurementOfficeImages
{
    public function read(string $path, string $name, callable $reader): array
    {
        $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if (! in_array($extension, ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'], true)) {
            return ['text' => '', 'confidence' => 0, 'error' => 'office_media_format'];
        }
        $zip = new ZipArchive;
        if ($zip->open($path) !== true) {
            throw new \RuntimeException('invalid_office');
        }
        $temporary = dirname($path).'/asset-'.bin2hex(random_bytes(16)).'.image';
        try {
            $info = $zip->statName($name);
            if (! $info || $info['size'] > 30 * 1024 * 1024) {
                return ['text' => '', 'confidence' => 0, 'error' => 'office_media_limit'];
            }
            $input = $zip->getStream($name);
            if (! is_resource($input)) {
                throw new \RuntimeException('office_media_read');
            }
            $output = fopen($temporary, 'xb');
            if (! $output) {
                fclose($input);
                throw new \RuntimeException('office_media_write');
            }
            chmod($temporary, 0600);
            try {
                $size = stream_copy_to_stream($input, $output, 30 * 1024 * 1024 + 1);
            } finally {
                fclose($input);
                fclose($output);
            }
            if (! $size || $size > 30 * 1024 * 1024) {
                return ['text' => '', 'confidence' => 0, 'error' => 'office_media_limit'];
            }
            $dimensions = @getimagesize($temporary);
            if (! $dimensions || $dimensions[0] * $dimensions[1] > 25000000) {
                return ['text' => '', 'confidence' => 0, 'error' => 'office_media_limit'];
            }
            $result = $reader($temporary, $extension);

            return ['text' => $result['text'], 'confidence' => $result['confidence'] ?? 0, 'error' => trim($result['text']) === '' ? 'office_image_empty' : null];
        } finally {
            $zip->close();
            if (is_file($temporary)) {
                unlink($temporary);
            }
        }
    }
}
