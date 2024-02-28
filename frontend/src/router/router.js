import Vue from 'vue';
import store from '../store/index.js';
import VueRouter from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterUser from '../components/RegisterUser.vue';
import MachinesList from '../components/MachinesList.vue';
import EventsQuery from '../components/EventsQuery.vue';
import UserProfile from '../components/UserProfile.vue';
import MachineDetails from '../components/MachineDetails.vue';
import NotFound from '../components/NotFound.vue';
import NotAuthorized from '../components/NotAuthorized.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: () => {
      const isLoggedIn = store.getters['user/isLoggedIn'];
      return isLoggedIn ? '/machines' : '/sign-in';
    },
  },
  { path: '/sign-in', component: LoginForm },
  { path: '/register', component: RegisterUser },
  { path: '/machines', component: MachinesList, meta: { requiresAuth: true } },
  { path: '/events', component: EventsQuery, meta: { requiresAuth: true } },
  { path: '/user-profile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/machine-details/:id', name: 'machine-details', component: MachineDetails, meta: { requiresAuth: true } },
  { path: '/not-authorized', name: 'NotAuthorized', component: NotAuthorized },
  { path: '*', name: 'NotFound', component: NotFound },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters['user/isLoggedIn'];

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      try {
        await store.dispatch('user/fetchCurrentUser');
        const user = store.getters['user/getUser']
        if (!user.username) {
          next('/not-authorized');
        } else {
          next();
        }
      } catch (error) {
        next('/not-authorized');
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;