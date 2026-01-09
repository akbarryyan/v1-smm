<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/terms', function () {
    return Inertia::render('terms');
})->name('terms');

Route::get('/order-status', function () {
    return Inertia::render('order-status');
})->name('order-status');

Route::get('/benefits', function () {
    return Inertia::render('benefits');
})->name('benefits');

Route::get('/example-targets', function () {
    return Inertia::render('example-targets');
})->name('example-targets');

Route::get('/rent-smm', function () {
    return Inertia::render('rent-smm');
})->name('rent-smm');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
