
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = require('jquery');

require('semantic');

window.moment = require('moment');

window.uuid = require('uuid/v4');

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

window.Vue = require('vue');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',

};

// window.axios.defaults.headers.common['X-CSRF-TOKEN'] = Colorpay.csrfToken;

// Vue.http.interceptors.push((request, next) => {
// 	request.headers.set('X-CSRF-TOKEN', Colorpay.csrfToken);

// 	next();
// });

Vue.prototype.$http = axios;

/** 
 * This will enable us to use lodash within vue interpolations.
 *  see: https://github.com/JeffreyWay/laravel-mix/issues/417#issuecomment-284460383
 */

Vue.prototype._ = _;
Vue.prototype.moment = moment;
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from "laravel-echo"

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });