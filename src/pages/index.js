import Vue from 'vue';
import App from './main.vue';
import router from '../router/index';
import store from '../store';
import '../common/flexible';
import '../common/base.css';

Vue.config.productionTip = false;
const app = new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App/>',
  router,
  store,
});
app.$mount('#app');
