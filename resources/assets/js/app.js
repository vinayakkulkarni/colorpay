/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./vendor');
require('./semantic-ui-tablesort');
require('./app/custom');
window.NProgress = require('nprogress');
NProgress.configure({ showSpinner: false, trickleSpeed: 1000, easing: 'ease', speed: 700, minimum: 0.3 });

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('checkout', require('./components/checkout.vue'));

import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Vue ScrollTo - https://github.com/rigor789/vue-scrollto
import vueScrollTo from 'vue-scrollTo';
Vue.use(vueScrollTo);

// Vue Sweet alert - https://github.com/lishengzxc/vue-sweetalert
import VueSweetAlert from 'vue-sweetalert';
Vue.use(VueSweetAlert);

// Toast Notification - https://github.com/shakee93/vue-toasted
import Toasted from 'vue-toasted';
Vue.use(Toasted, {position: 'bottom-right', duration: 3000});

// Register a global custom directive called v-tablesort
Vue.directive('tablesort', {
  inserted: function (el) {
    $(el).tablesort();
  }
});

// Register a global custom directive called v-dropdown
Vue.directive('modal', {
  inserted: function (el) {
    $(el).modal('setting', { detachable: false, autofocus: true, closable: false, transition: 'fade' }).modal('show').addClass('scrolling active');
  }
});

// Filter to display numerical digits
Vue.filter('number', value =>{
  return (value/1).toLocaleString('en', { minimumFractionDigits: 3 });
})

import router from './routes';

// Load the component where id = 'app'
window.onload = () => {
  if (document.getElementById("app")) {
  	var app = new Vue({
  	    el: '#app',
        router
  	});
  }
}