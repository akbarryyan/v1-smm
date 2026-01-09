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

    Route::prefix('rankings')->group(function () {
        Route::get('orders', function () {
            return Inertia::render('rankings/orders');
        })->name('rankings.orders');

        Route::get('deposits', function () {
            return Inertia::render('rankings/deposits');
        })->name('rankings.deposits');

        Route::get('services', function () {
            return Inertia::render('rankings/services');
        })->name('rankings.services');
    });

    Route::get('tickets', function () {
        return Inertia::render('tickets');
    })->name('tickets');

    Route::get('news', function () {
        return Inertia::render('news');
    })->name('news');

    Route::get('service-updates', function () {
        return Inertia::render('service-updates');
    })->name('service-updates');

    Route::get('service-monitoring', function () {
        return Inertia::render('service-monitoring');
    })->name('service-monitoring');

    Route::get('settings/profile', function () {
        return Inertia::render('settings/profile');
    })->name('settings.profile');

    Route::get('balance/mutations', function () {
        return Inertia::render('balance/mutations');
    })->name('balance.mutations');

    Route::get('login-logs', function () {
        return Inertia::render('login-logs');
    })->name('login-logs');
});

require __DIR__.'/settings.php';
