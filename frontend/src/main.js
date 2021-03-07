import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
const GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;
Vue.use(Donut);
Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
  },
});
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
}).$mount('#app');
