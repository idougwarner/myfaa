import 'es6-promise/auto';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import boot from './boot';
import './scss/index.scss';
import apolloProvider from './apollo-provider';

window.Vue = Vue;
require('./assets/quasar.umd.min.js');

Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  el: '#q-app',
  store,
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
});

boot(['vuelidate'], {
  Vue,
  app,
  router,
  store
});
