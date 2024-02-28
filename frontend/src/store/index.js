import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './modules/userStore.js';
import machineStore from './modules/machineStore.js';
import eventStore from './modules/eventStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userStore,
    machine: machineStore,
    event: eventStore,
  },
});