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

// Route::post('subscriptions', 'SubscriptionsController@store');

Route::group(['namespace' => 'Web'], function () {

	Auth::routes();

	Route::get('/', 'DashboardController@index')->name('dashboard');

	Route::get('/home', 'HomeController@index')->name('home');

	Route::get('users/{any?}', 'UsersController@index')->name('users')->where('any', '.*');

});
