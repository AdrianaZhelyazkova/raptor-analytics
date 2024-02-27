import { apiInstance } from "@/services/api";
import Cookies from "js-cookie";

export default {
    namespaced: true,

    state: {
        user: null,
        loggedIn: false,
    },

    mutations: {
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        },

        setUser(state, user) {
            state.user = user;
        },
    },

    actions: {
        async login({ commit }) {
            await apiInstance.get('users/current_user/')
                .then(response => {
                    console.log(response)
                    commit('setUser', response.data.user);
                });
        },

        async register({ commit }, userData) {
            try {
                const response = await apiInstance.post('users/', userData);
                commit('setLoggedIn', true);
                commit('setUser', response.data);
            }

            catch (error) {
                console.error('Error registering user:', error);
            }
        },

        async logout({ commit }) {
            try {
                await apiInstance.post('users/logout/');
                Cookies.remove('auth_token');
                commit('setUser', null);
            }
            catch (error) {
                console.error('Error logging in user:', error);
            }
        },

        async updateUserProfile({commit}, userProfile) {
            try {
                const response = await apiInstance.put(`users/${userProfile.id}/`, userProfile);
                commit('setUser',  response.data );
                alert('User profile updated successfully!');
            }
            catch (error) {
                console.error('Error updating user profile:', error);
                alert('Error updating user profile. Please try again.');
            }
        },
    },

    getters: {
        getUser: state => state.user,
    },
};