import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';
import router from './router';
import Cookies from 'js-cookie';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App),
  async created() {
    await this.checkTokenOnLoad();
  },
  methods: {
    async checkTokenOnLoad() {
      const token = Cookies.get('auth_token');
      if (token) {
         await this.$store.dispatch('user/fetchCurrentUser');
      }
    },
  },
}).$mount('#app')
