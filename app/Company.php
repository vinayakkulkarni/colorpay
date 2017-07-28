<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';

    protected $primaryKey = 'id';

    protected $fillable = ['user_id', 'vat_id', 'name', 'legal_name', 'url', 'phone', 'address', 'logo'];

    protected $attributes = [
    	'vat_id' 		=> null,
    	'name'			=> null,
    	'legal_name'	=> null,
    	'url'			=> null,
    	'phone'			=> null,
    	'address'		=> null,
    	'logo'			=> null
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'user_id');
    }
}
