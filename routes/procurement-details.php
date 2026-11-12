<?php

use App\Http\Controllers\ProcurementDetailAttachmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('procurement/details')->name('procurement.details.')->middleware(['auth', 'readonly.block', 'dept:umum'])->group(function () {
    Route::post('/{kind}/drafts', [ProcurementDetailAttachmentController::class, 'upload'])->whereIn('kind', ['sp', 'spph'])->middleware('throttle:10,1,procurement-detail-upload:')->name('upload');
    Route::get('/attachments/{attachment}/download', [ProcurementDetailAttachmentController::class, 'download'])->name('download');
    Route::put('/attachments/{attachment}', [ProcurementDetailAttachmentController::class, 'review'])->middleware('throttle:20,1,procurement-detail-review:')->name('review');
    Route::delete('/attachments/{attachment}', [ProcurementDetailAttachmentController::class, 'destroy'])->middleware('throttle:10,1,procurement-detail-delete:')->name('delete');
    Route::get('/{kind}/{id}', [ProcurementDetailAttachmentController::class, 'show'])->whereIn('kind', ['sp', 'spph'])->whereNumber('id')->name('show');
    Route::post('/{kind}/{id}/defer', [ProcurementDetailAttachmentController::class, 'defer'])->whereIn('kind', ['sp', 'spph'])->whereNumber('id')->middleware('throttle:20,1,procurement-detail-defer:')->name('defer');
});
