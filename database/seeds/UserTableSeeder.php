<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
	    $user = App\User::create(['name' => 'Vinayak','email' => 'demo@example.com','company_name'=> 'Google Inc.', 'password'=> Hash::make('123456')]);

        DB::table('companies')->delete();
        App\Company::create(['user_id' => $user->id, 'name' => 'Google Inc.']);

        DB::table('plans')->delete();
        App\Plan::create(['name' => '$3 Topup','price' => 300]);
        App\Plan::create(['name' => '$10 Topup','price' => 1000]);
        App\Plan::create(['name' => '$30 Topup','price' => 3000]);
    }
}
