<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/products', function () {
    return view('welcome');
});
Route::get('/users', function () {
    return view('welcome');
});
Route::get('/roles', function () {
    return view('welcome');
});
Route::get('/categories', function () {
    return view('welcome');
});
Route::get('/subcategory', function () {
    return view('welcome');
});
