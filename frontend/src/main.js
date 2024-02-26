import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterUser from './components/RegisterUser.vue';
import MachinesList from './components/MachinesList.vue';
import EventsQuery from './components/EventsQuery.vue';
import UserProfile from './components/UserProfile.vue';
import MachineDetails from './components/MachineDetails.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginForm },
  { path: '/register', component: RegisterUser },
  { path: '/machines', component: MachinesList },
  { path: '/events', component: EventsQuery },
  { path: '/user-profile', component: UserProfile },
  { path: '/machine-details/:id', name: 'machine-details', component: MachineDetails },
];

const router = new VueRouter({
  routes,
});

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
        try {
          const response = await axios.get('http://localhost:8000/api/users/current_user/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          this.$store.commit('user/setUser', response.data.user);
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
    },
  },
}).$mount('#app')
