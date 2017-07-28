<template>
  <form class="ui form" action="/api/v1/subscriptions" method="POST" style="margin-top:50px;">

    <input type="hidden" name="stripeToken" v-model="stripeToken">
    <input type="hidden" name="stripeEmail" v-model="stripeEmail">

    <select class="ui dropdown" name="plan" v-model="plan">
      <option v-for="plan in plans" :value="plan.id">{{ plan.name }}</option>
    </select>

      <button class="ui right labeled icon button" :class="{ 'disabled loading' : this.loading }" type="submit" @click.prevent="stripeTopUp">Topup via <i class="stripe icon"></i></button>

      <button class="ui right labeled icon button" :class="{ 'disabled' : this.loading }" type="submit" @click.prevent="stripeTopUp">Topup via <i class="paypal icon"></i></button>

    <div class="ui pointing red basic label" v-show="status">{{ status }}</div>
  </form>
</template>

<script>
export default {
  props: {
    plans: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: false
    },
    id: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      stripeToken: '',
      stripeEmail: '',
      plan: 1,
      status: false,
      loading: false,
      local_id: null,
      localUser: {},
      email: null,
    }
  },
  mounted() {
    $('.ui.dropdown').dropdown();
    console.log('user', this.user);

    if (this.user) {
      this.email = this.user.email;
    }

    if (this.id) {
      this.local_id = this.id;
    }

    if (this.local_id) {
      this.loadUser(this.local_id);
    }
  },
  created() {
    let t = this;
    this.stripe = StripeCheckout.configure({
      key: Colorpay.stripeKey,
      image: "http://i.usatoday.net/_common/_notches/857b31fa-2754-4722-91af-eb44dbc47690-MARKETPLACE.png",
      locale: "auto",
      token: (token) => {
        this.stripeToken = token.id;
        this.stripeEmail = token.email;
        t.loading = true;
        NProgress.start();
        this.$http.post('/api/v1/subscriptions', this.$data)
            .then(
              response => { 
                console.log(response.data);
                Vue.toasted.success('Topup Successful!');
                NProgress.done(true);
                t.loading = false;
              },
              response => this.status = response.body.status
            );
      }
    })
  },
  methods: {
    stripeTopUp() {
      let plan = this.findPlanById(this.plan);
      this.stripe.open({
        email: this.email,
        name: plan.name,
        description: plan.name,
        zipCode: true,
        amount: plan.price
      });
    },
    findPlanById(id){
      return this.plans.find(plan => plan.id == id);
    },
    loadUser(id) {
      let t = this;
      this.loading = true;
      NProgress.start();
      this.$http.get('/api/v1/users/' + id)
          .then(response => {
            console.log('response.data', response.data);
            t.localUser = response.data;
            t.email = response.data.email;
            t.loading = false;
            NProgress.done(true);
            Vue.toasted.info('Data Loaded Successfully!');
          });
    }
  }
}
</script>
