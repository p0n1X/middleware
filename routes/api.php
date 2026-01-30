<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;


Route::prefix('auth')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [UserController::class, 'logout']);
    });
});

Route::prefix('item')->group(function () {
    Route::get('/', [ItemController::class, 'index']);
    Route::get('/{id}', [ItemController::class, 'show']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [ItemController::class, 'store']);
        Route::put('/completed/{id}', [ItemController::class, 'completed']);
        Route::put('/{id}', [ItemController::class, 'update']);
        Route::delete('/{id}', [ItemController::class, 'destroy']);
    });
});

Route::get('/stats', [ItemController::class, 'stats']);


Route::get('/category', [CategoryController::class, 'index']);
Route::get('/category/{id}', [CategoryController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/category/{id}', [CategoryController::class, 'update']);
    Route::post('/category', [CategoryController::class, 'store']);
    Route::delete('/category/{id}', [CategoryController::class, 'destroy']);
});
