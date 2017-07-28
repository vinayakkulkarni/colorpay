<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChargesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->increments('id');
            $table->char('user_id')->index();
            $table->char('stripe_response_id')->index();
            $table->string('amount')->nullable()->index();
            $table->string('currency')->nullable()->index();
            $table->string('customer')->nullable()->index();
            $table->string('email')->nullable()->index();
            $table->boolean('captured')->default(0)->index();
            $table->boolean('paid')->default(0)->index();
            $table->boolean('refunded')->default(0)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('charges');
    }
}
