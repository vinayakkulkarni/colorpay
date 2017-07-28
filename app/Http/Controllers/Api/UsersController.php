<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Requests\UserRequest;

class UsersController extends ApiController
{
    /**
     * Retrieve the Location & Registers master View from the database.
     *
     * @return single location view
     */
    public function index()
    {
        return User::with('charges', 'company')->orderBy('name')->paginate(25);
    }

    /**
     * Retrieve the Location & Registers master View from the database.
     *
     * @return single location view
     */
    public function show($id)
    {
        return User::with('charges', 'company')->findOrFail($id);
    }
}
