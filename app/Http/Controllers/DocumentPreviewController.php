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

        $response = response()->file($path, [
            'Content-Type' => $mime,
            'Cache-Control' => 'private, no-cache, max-age=0, must-revalidate',
        ]);
        $response->setPrivate();
        $response->setContentDisposition($request->boolean('download') ? 'attachment' : 'inline', $filename);
        $response->setEtag($preview['sha256'] ?? hash_file('sha256', $path));
        // Resolve ownership and expiry before honoring a conditional browser read.
        $response->isNotModified($request);

        return $response;
    }
}
