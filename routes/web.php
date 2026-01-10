<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::post('/callback/tokopay', [\App\Http\Controllers\Api\TokopayCallbackController::class, 'handle'])->name('callback.tokopay');

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
        $user = Auth::user();
        $monthlyUsage = \App\Models\Order::where('user_id', $user->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->whereNotIn('status', ['error', 'canceled', 'failure'])
            ->sum('total_cost');

        return Inertia::render('dashboard', [
            'monthlyUsage' => $monthlyUsage,
        ]);
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

    Route::get('service-monitoring', [\App\Http\Controllers\ServiceMonitoringController::class, 'index'])->name('service-monitoring');

    Route::get('settings/profile', function () {
        return Inertia::render('settings/profile');
    })->name('settings.profile');

    Route::get('balance/mutations', [\App\Http\Controllers\BalanceController::class, 'mutations'])->name('balance.mutations');

    Route::get('login-logs', [\App\Http\Controllers\LoginLogController::class, 'index'])->name('login-logs');

    Route::get('contact-us', function () {
        return Inertia::render('contact-us');
    })->name('contact-us');

    Route::get('faq', function () {
        return Inertia::render('faq');
    })->name('faq');

    Route::get('terms-of-service', function () {
        return Inertia::render('terms-of-service');
    })->name('terms-of-service');

    Route::get('sewa-smm', function () {
        return Inertia::render('sewa-smm');
    })->name('sewa-smm');

    Route::get('contoh-pengisian-target', function () {
        return Inertia::render('contoh-pengisian-target');
    })->name('contoh-pengisian-target');

    Route::get('penjelasan-status-pesanan', function () {
        return Inertia::render('penjelasan-status-pesanan');
    })->name('penjelasan-status-pesanan');

    Route::get('keuntungan-join-medanpedia', function () {
        return Inertia::render('keuntungan-join-medanpedia');
    })->name('keuntungan-join-medanpedia');

    Route::get('services', [\App\Http\Controllers\ServiceController::class, 'index'])->name('services.index');
    Route::get('service-updates', [\App\Http\Controllers\ServiceUpdateController::class, 'index'])->name('service-updates.index');

    Route::get('deposit', [\App\Http\Controllers\DepositController::class, 'index'])->name('deposit');
    Route::post('deposit', [\App\Http\Controllers\DepositController::class, 'store'])->name('deposit.store');
    Route::get('deposit/show/{refId}', [\App\Http\Controllers\DepositController::class, 'show'])->name('deposit.show');
    Route::post('deposit/check/{refId}', [\App\Http\Controllers\DepositController::class, 'checkStatus'])->name('deposit.check');

    Route::get('deposit/history', [\App\Http\Controllers\DepositController::class, 'history'])->name('deposit.history');

    Route::get('orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');

    Route::get('tickets', [\App\Http\Controllers\TicketController::class, 'index'])->name('tickets.index');
    Route::post('tickets', [\App\Http\Controllers\TicketController::class, 'store'])->name('tickets.store');
    Route::get('tickets/{id}', [\App\Http\Controllers\TicketController::class, 'show'])->name('tickets.show');
    Route::post('tickets/{id}/reply', [\App\Http\Controllers\TicketController::class, 'reply'])->name('tickets.reply');

    Route::get('orders/create', [\App\Http\Controllers\OrderController::class, 'create'])->name('orders.create');
    Route::post('orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');

    Route::get('orders/mass', function () {
        return Inertia::render('orders/mass');
    })->name('orders.mass');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::get('orders', function () {
        return Inertia::render('admin/orders');
    })->name('orders');

    Route::get('services', [\App\Http\Controllers\Admin\ServiceController::class, 'index'])->name('services');
    Route::post('services/{service}/toggle', [\App\Http\Controllers\Admin\ServiceController::class, 'toggle'])->name('services.toggle');
    Route::put('services/{service}/price', [\App\Http\Controllers\Admin\ServiceController::class, 'updatePrice'])->name('services.update-price');
    Route::delete('services/{service}', [\App\Http\Controllers\Admin\ServiceController::class, 'destroy'])->name('services.destroy');
    Route::post('services/bulk-toggle', [\App\Http\Controllers\Admin\ServiceController::class, 'bulkToggle'])->name('services.bulk-toggle');

    Route::get('categories', function () {
        return Inertia::render('admin/categories');
    })->name('categories');

    Route::get('providers', [\App\Http\Controllers\Admin\ProviderController::class, 'index'])->name('providers');
    Route::post('providers', [\App\Http\Controllers\Admin\ProviderController::class, 'store'])->name('providers.store');
    Route::put('providers/{provider}', [\App\Http\Controllers\Admin\ProviderController::class, 'update'])->name('providers.update');
    Route::delete('providers/{provider}', [\App\Http\Controllers\Admin\ProviderController::class, 'destroy'])->name('providers.destroy');
    Route::post('providers/{provider}/toggle', [\App\Http\Controllers\Admin\ProviderController::class, 'toggle'])->name('providers.toggle');
    Route::post('providers/{provider}/test', [\App\Http\Controllers\Admin\ProviderController::class, 'testConnection'])->name('providers.test');
    Route::post('providers/{provider}/sync', [\App\Http\Controllers\Admin\ProviderController::class, 'syncServices'])->name('providers.sync');
    Route::post('providers/{provider}/balance', [\App\Http\Controllers\Admin\ProviderController::class, 'checkBalance'])->name('providers.balance');

    Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users');
    Route::post('users/{user}/add-balance', [\App\Http\Controllers\Admin\UserController::class, 'addBalance'])->name('users.add-balance');
    Route::post('users/{user}/subtract-balance', [\App\Http\Controllers\Admin\UserController::class, 'subtractBalance'])->name('users.subtract-balance');
    Route::post('users/{user}/suspend', [\App\Http\Controllers\Admin\UserController::class, 'suspend'])->name('users.suspend');
    Route::post('users/{user}/unsuspend', [\App\Http\Controllers\Admin\UserController::class, 'unsuspend'])->name('users.unsuspend');

    Route::get('transactions', function () {
        return Inertia::render('admin/transactions');
    })->name('transactions');

    Route::get('logs', function () {
        return Inertia::render('admin/logs');
    })->name('logs');

    Route::get('settings', [\App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('settings');
    Route::put('settings/profile', [\App\Http\Controllers\Admin\SettingsController::class, 'updateProfile'])->name('settings.profile');
    Route::put('settings/password', [\App\Http\Controllers\Admin\SettingsController::class, 'updatePassword'])->name('settings.password');

    // Payment Gateway
    Route::get('payment-gateway', [\App\Http\Controllers\Admin\PaymentGatewayController::class, 'index'])->name('payment-gateway');
    Route::post('payment-gateway/{channel}/toggle', [\App\Http\Controllers\Admin\PaymentGatewayController::class, 'toggle'])->name('payment-gateway.toggle');
    Route::put('payment-gateway/{channel}/fee', [\App\Http\Controllers\Admin\PaymentGatewayController::class, 'updateFee'])->name('payment-gateway.fee');
    Route::post('payment-gateway/bulk-toggle', [\App\Http\Controllers\Admin\PaymentGatewayController::class, 'bulkToggle'])->name('payment-gateway.bulk-toggle');
    Route::post('payment-gateway/test', [\App\Http\Controllers\Admin\PaymentGatewayController::class, 'testConnection'])->name('payment-gateway.test');
    Route::post('payment-gateway/sync', [\App\Http\Controllers\Admin\PaymentGatewayController::class, 'syncChannels'])->name('payment-gateway.sync');
});

require __DIR__.'/settings.php';
