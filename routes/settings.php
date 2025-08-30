<?php

use App\Http\Controllers\Settings;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [Settings\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [Settings\ProfileController::class, 'update'])->name('profile.update');

    Route::get('settings/password', [Settings\PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [Settings\PasswordController::class, 'update'])->name('password.update');
    Route::get('settings/appearance', Settings\AppearanceController::class)->name('settings.appearance');
    Route::get('settings/delete-account', [Settings\DeleteAccountController::class, 'index'])->name('settings.delete-account');
    Route::delete('settings/delete-account', [Settings\DeleteAccountController::class, 'destroy'])->name('settings.delete-account');

});
