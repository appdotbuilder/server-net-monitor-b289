<?php

use App\Http\Controllers\AlertController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NetworkDeviceController;
use App\Http\Controllers\ServerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - monitoring dashboard
Route::get('/', [DashboardController::class, 'index'])->name('home');
Route::post('/', [DashboardController::class, 'store'])->name('dashboard.refresh');

// Monitoring routes
Route::resource('servers', ServerController::class)->only(['index', 'show']);
Route::resource('network-devices', NetworkDeviceController::class)->only(['index', 'show']);
Route::resource('alerts', AlertController::class)->only(['index', 'update']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
