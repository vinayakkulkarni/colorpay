import VueRouter from 'vue-router';

import checkout from './components/checkout.vue';
import home from './components/home.vue';
import payments from './components/payments.vue';
import index from './components/users/index.vue';
import create from './components/users/create.vue';
import edit from './components/users/edit.vue';
import show from './components/users/show.vue';


let routes = [
  {
    path: '/',
    name: 'checkout',
    component: checkout,
    props: true,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    props: true,
  },
  {
    path: '/payments',
    name: 'payments',
    component: payments,
    props: true
  },
  {
    path: '/users',
    name: 'users.index',
    component: index,
    props: true
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: create,
    props: true
  },
  { 
    path: '/users/:id',
    name: 'users.show', 
    component: show,
    props: true
  },
];

export default new VueRouter({
  mode: 'history',
  routes: routes
});

// Important To-DO
// https://forum.vuejs.org/t/pass-props-for-different-components-via-one-router-view/1489/2