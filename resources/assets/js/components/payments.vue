<template>
<div>
  <div class="sixteen wide column" v-if="this.loading">
    <div class="ui segment" style="height:200px;">
      <div class="ui inverted dimmer" :class="{active: loading}">
      <div class="ui text large loader">Loading</div>
      </div>
    </div>
  </div>
  <div class="sixteen wide column" v-if="!this.loading">
    <div class="ui icon message">
      <i class="user icon"></i>
      <div class="content">
        <div class="header">
          {{ userData.name }}
        </div>
        <p>Total Balance: {{ _.sumBy(userData.charges, 'amount') / 100 }}</p>
      </div>
    </div>
    <table class="ui celled fluid sortable table" v-if="userData.charges.length > 0">
      <thead>
        <tr>
          <th class="one wide">Sr. No.</th>
          <th class="two wide">Currency</th>
          <th class="two wide right aligned">Amount</th>
          <th class="one wide">Paid</th>
          <th class="one wide">Refunded</th>
          <th class="two wide">Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(charge, index) in userData.charges">
          <td>
            <div class="ui ribbon label">{{ index + 1 }}</div>
          </td>
          <td>
            {{ _.upperCase(charge.currency) }}
          </td>
          <td class="right aligned">
            {{ charge.amount / 100}}
          </td>
          <td>
            <div class="ui green red basic label" v-if="charge.paid">
              Paid
            </div>
          </td>
          <td>
            <div class="ui red basic label" v-if="charge.refunded">
              YES
            </div>
            <div class="ui red basic label" v-if="!charge.refunded">
              NO
            </div>
          </td>
          <td>
            <div class="ui teal basic label">{{ moment(charge.updated_at).format("DD/MM/YY HH:mm:ss") }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      No Payment History!
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      local_id : this.id,
      loading: false,
      userData: {},
    }
  },
  created() {
    if (this.id) {
      this.local_id = this.id;
    }
    if (this.local_id) {
      this.loadData(this.local_id);
    }
  },
  mounted() {
    $('table').tablesort();
  },
  methods: {
    loadData(id) {
      let t = this;
      this.loading = true;
      NProgress.start();
      this.$http.get('/api/v1/users/' + id)
          .then(response => {
            console.log('reseponse.data', response.data);
            t.userData = response.data;
            t.loading = false;
            NProgress.done(true);
          });
    }
  },
  computed: {

  },
  watch: {
    
  }
}
</script>