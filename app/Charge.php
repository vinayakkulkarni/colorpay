<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Charge extends Model
{
    protected $table = 'charges';

    protected $primaryKey = 'id';

    protected $fillable = ['user_id', 'stripe_response_id', 'amount', 'currency', 'captured', 'paid', 'refunded', 'customer', 'email'];

    protected $casts = ['amount' => 'integer', 'captured' => 'boolean', 'paid' => 'boolean', 'refunded' => 'boolean'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
