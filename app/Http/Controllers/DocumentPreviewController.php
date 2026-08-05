<?php

namespace App\Http\Controllers;

use App\Support\PrintPreviewFile;
use Illuminate\Http\Request;

class DocumentPreviewController extends Controller
{
    public function file(Request $request, string $token)
    {
        $preview = PrintPreviewFile::resolve($token);
        $path = $preview['absolute_path'];
        $filename = $preview['filename'] ?? basename($path);
        $mime = mime_content_type($path) ?: 'application/octet-stream';

        if ($request->boolean('download')) {
            return response()->download($path, $filename, [
                'Content-Type' => $mime,
                'Cache-Control' => 'private, max-age=1800',
            ]);
        }

        return response()->file($path, [
            'Content-Type' => $mime,
            'Content-Disposition' => 'inline; filename="'.addcslashes($filename, '"\\').'"',
            'Cache-Control' => 'private, max-age=1800',
        ]);
    }
}
