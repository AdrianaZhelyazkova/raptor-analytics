import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterUser from './components/RegisterUser.vue';
import MachinesList from './components/MachinesList.vue';
import UserProfile from './components/UserProfile.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginForm },
  { path: '/register', component: RegisterUser },
  { path: '/machines', component: MachinesList },
  { path: '/user-profile', component: UserProfile },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
