import Vue from 'vue';
import store from './store/store.js';
import VueRouter from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterUser from './components/RegisterUser.vue';
import MachinesList from './components/MachinesList.vue';
import EventsQuery from './components/EventsQuery.vue';
import UserProfile from './components/UserProfile.vue';
import MachineDetails from './components/MachineDetails.vue';
import NotFound from './components/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      const isLoggedIn = store.getters['user/isLoggedIn'];

      if (isLoggedIn) {
        next('/machines');
      } else {
        next('/sign-in');
      }
    },
  },
  { path: '/sign-in', component: LoginForm },
  { path: '/register', component: RegisterUser },
  { path: '/machines', component: MachinesList },
  { path: '/events', component: EventsQuery },
  { path: '/user-profile', component: UserProfile },
  { path: '/machine-details/:id', name: 'machine-details', component: MachineDetails },
  { path: '*', name: 'NotFound', component: NotFound },
];

const router = new VueRouter({
  routes,
});

export default router;