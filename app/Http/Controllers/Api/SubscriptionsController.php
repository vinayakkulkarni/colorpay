<?php

namespace App\Http\Controllers\Api;

use App\Plan;
use App\Charge;
use Illuminate\Http\Request;

class SubscriptionsController extends ApiController
{
    /**
     * Charge for Logged in User;
     * @return $user Collection
     */
    public function store() 
    {
    	$plan = Plan::findOrFail(request('plan'));
        
        $user = auth()->user();

        $token = request('stripeToken');

        $user->createAsStripeCustomer($token);

        $c = new Charge;

        try {
            // $response = $user->newSubscription('plan', $plan->name)->create(request('stripeToken'));
            $response = $user->charge($plan->price);

            $c['user_id'] = $user->id;
            $c['stripe_response_id'] = $response['id'];
            $c['amount'] = $response['amount'];
            $c['currency'] = $response['currency'];
            $c['captured'] = $response['captured'];
            $c['paid'] = $response['paid'];
            $c['refunded'] = $response['refunded'];
            $c['customer'] = $response['customer'];
            $c['email'] = $response['source.email'];

            $c->save();

        } catch (Exception $e) {
            return response()->json(['status' => $e.getMessage()], 422);
        }
        $user->charge($plan->price);

        return $response;
    }

    /**
     * Cancel a Subscription for Logged in User;
     * @return $user Collection
     */
    public function cancel() 
    {
        $plan = Plan::findOrFail(request('plan'));
        
        $user = auth()->user();

        $user->subscription('plan')->cancel();

        return $user;
    }
}
