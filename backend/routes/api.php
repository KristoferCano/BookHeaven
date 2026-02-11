<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComicController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\MangaController;
use App\Models\Comic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DashboardController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\ChangePasswordController;



/* ================================
   RUTAS DE AUTENTICACIÓN (Públicas)
================================ */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/* ================================
   RUTAS PROTEGIDAS (Requieren token)
================================ */
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::get(
    '/dashboard/stats',
    [DashboardController::class, 'stats']
);


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect(env('FRONTEND_URL') . '/email-confirmado');
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

Route::middleware('auth:sanctum')->post(
    '/change-password',
    [ChangePasswordController::class, 'update']
);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/perfil', function (Request $request) {
        return $request->user();
    });

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', fn () => 'Admin OK');
    });

    Route::middleware('role:admin,premium')->group(function () {
        Route::get('/premium/contenido', fn () => 'Premium OK');
    });

});

/* =================================
   RUTAS PÚBLICAS - LECTURA (SIN LOGIN)
================================= */

// 📚 LIBROS (Lectura pública)
Route::get('/libros', [LibroController::class, 'index']);
Route::get('/libros/{libro}', [LibroController::class, 'show']);

// 📖 MANGAS (Lectura pública)
Route::get('/mangas', [MangaController::class, 'index']);
Route::get('/mangas/{manga}', [MangaController::class, 'show']);

// 💬 CÓMICS (Lectura pública)
Route::get('/comics', [ComicController::class, 'index']);
Route::get('/comics/{comic}', [ComicController::class, 'show']);

/* =================================
   RUTAS PROTEGIDAS - ADMIN (EDICIÓN)
================================= */

Route::middleware('auth:sanctum')->group(function () {

    /* ========= ADMIN - CRUD COMPLETO ========= */
    Route::middleware('role:admin')->group(function () {

        // 📘 LIBROS (CRUD)
        Route::post('/libros', [LibroController::class, 'store']);
        Route::put('/libros/{libro}', [LibroController::class, 'update']);
        Route::delete('/libros/{libro}', [LibroController::class, 'destroy']);

        // 📖 MANGAS (CRUD)
        Route::post('/mangas', [MangaController::class, 'store']);
        Route::put('/mangas/{manga}', [MangaController::class, 'update']);
        Route::delete('/mangas/{manga}', [MangaController::class, 'destroy']);

        // 💬 COMICS (CRUD)
        Route::post('/comics', [ComicController::class, 'store']);
        Route::put('/comics/{comic}', [ComicController::class, 'update']);
        Route::delete('/comics/{comic}', [ComicController::class, 'destroy']);
    });

});
