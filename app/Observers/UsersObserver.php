<?php

namespace App\Observers;

use App\User;

class UserObserver
{
    /**
     * Listen to the user creating event.
     *
     * @param  User  $user
     * @return void
     */
    public function creating(User $user)
    {
        $user->{$user->getKeyName()} = uuid();
        $user->created_by = auth()->user()->id;
        $user->updated_by = auth()->user()->id;
    }

    /**
     * Listen to the user updating event.
     *
     * @param  user  $user
     * @return void
     */
    public function updating(user $user)
    {
        $user->updated_by = auth()->user()->id;
    }
}
