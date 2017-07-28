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
		<!-- <div class="ui padded segment">
			<h3 class="ui icon centered header">
				<i class="signup icon"></i>Welcome! You've successfully logged in.
				<div class="sub header">This page will display all your checkout's and wallet topup details.</div>
			</h3>
		</div> -->
		<div>
			<table class="ui celled fluid table">
			  <thead>
			    <tr>
			    	<th class="one wide">Sr. No.</th>
			    	<th class="three wide">Name</th>
			    	<th class="three wide">Email</th>
			    	<th class="three wide">Company Name</th>
			    	<th class="one wide">Card</th>
			    	<th class="right aligned one wide">Balance</th>
			    	<th class="three wide">Actions</th>
			  	</tr>
			  </thead>
			  <tbody>
			    <tr v-for="(user, index) in userData">
			      <td>
			        <div class="ui ribbon label">{{ index + 1 }}</div>
			      </td>
			      <td>
			      	{{ user.name }}
			      </td>
			      <td>
			      	<a :href="'mailto:' + user.email"><i class="mail icon"></i> {{ user.email }}</a>
			      </td>
			      <td>
			      	{{ user.company_name }}
			      </td>
			      <td>
			      	<span v-if="user.card_brand">{{ user.card_brand }}</span>
			      	<span v-else>N/A</span>
			      </td>
			      <td class="right aligned">
			      	${{ _.sumBy(user.charges, 'amount') / 100 }}
			      </td>
			      <td>
			      	<div class="ui buttons">
								<router-link
									tag="button"
				          class="ui teal basic button"
				          :to="{ name: 'payments', params: { id: user.id }}" exact>
									View Profile
								</router-link>
								<router-link 
				          tag="button"
				          class="ui red basic button"
				          :to="{ name: 'checkout', params: { id: user.id } }" exact>
				          Top up
				        </router-link>
							</div>
			      </td>
			    </tr>
			  </tbody>
			</table>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			loading: false,
			userData: [],
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		loadData() {
			let t = this;
			t.loading = true;
			NProgress.start();
			this.$http.get('/api/v1/users')
					.then(response => {
						t.userData = response.data.data;
						t.loading = false;
						NProgress.done(true);
						Vue.toasted.success('Data Loaded Successfully!');
					});
		}
	},
	computed: {

	},
	watch: {
		
	}
}
</script>