import Vue from 'vue';
import App from './App';
import router from './router';

window.Vue = Vue;
require('./assets/quasar.umd.min.js');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#q-app',
  router,
  components: { App },
  template: '<App/>'
});
