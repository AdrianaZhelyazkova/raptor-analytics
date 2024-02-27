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
        async fetchCurrentUser({ commit }) {
            await apiInstance.get('users/current_user/')
                .then(response => {
                    commit('setUser', response.data.user);
                });
        },

        async login({ commit, dispatch }, userData) {
            try {
                const response = await apiInstance.post('users/login/', userData)
                const token = response.data.token;
                Cookies.set('auth_token', token, { expires: 1 })
                await commit('setLoggedIn', true);
                await dispatch('fetchCurrentUser');
            }
            catch {
                (error) => {
                    console.error('Error logging in user:', error);
                };
            }

        },

        async register({ commit }, userData) {
            try {
                const response = await apiInstance.post('users/', userData);

                const user = response.data.user;

                commit('setLoggedIn', true);
                commit('setUser', user);
            } catch (error) {
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

        async updateUserProfile({ commit }, userProfile) {
            try {
                const response = await apiInstance.put(`users/${userProfile.id}/`, userProfile);
                commit('setUser', response.data);
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
        isLoggedIn: state => state.loggedIn,
    },
};