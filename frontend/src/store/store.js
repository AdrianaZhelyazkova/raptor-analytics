import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './userStore.js';
import machineStore from './machineStore.js';
import eventStore from './eventStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userStore,
    machine: machineStore,
    event: eventStore,
  },
});