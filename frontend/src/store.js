import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null, 
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }) {
        const token = Cookies.get('auth_token');
        console.log(token)
        const config = {
            headers: {
                Authorization: `Token ${token}`,
            }
        };
        await axios.get('http://localhost:8000/api/users/current_user/', config)
        .then(response =>{
            commit('setUser', response.data.user);
        });
    },
  },
  getters: {
    getUser: state => state.user,
  },
});