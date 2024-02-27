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
            console.log(loggedIn)
            state.loggedIn = loggedIn;
        },

        setUser(state, user) {
            state.user = user;
        },
    },

    actions: {
        async fetchCurrentUser({ commit }) {
            try {
                await apiInstance.get('users/current_user/')
                    .then(response => {
                        commit('setUser', response.data.user);
                        if (response.data.user.id) {
                            commit('setLoggedIn', true);
                        }
                    });
            }
            catch (error) {
                console.log('Error loggin in user', error);
            }

        },

        async login({ commit, dispatch }, userData) {
            try {
                const response = await apiInstance.post('users/login/', userData)
                const token = response.data.token;
                Cookies.set('auth_token', token, { expires: 1 })
                await commit('setLoggedIn', true);
                await dispatch('fetchCurrentUser');
            }
            catch (error) {
                console.error('Error logging in user:', error);
            }
        },
        async register({ commit, dispatch }, userData) {
            try {
                const response = await apiInstance.post('users/', userData);
                await dispatch('login', { username: userData.username, password: userData.password });
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
                await commit('setUser', null);
                await commit('setLoggedIn', false);
            } catch (error) {
                console.error('Error logging out user:', error);
            }
        },

        async updateUserProfile({ commit }, userProfile) {
            try {
                const response = await apiInstance.patch(`users/${userProfile.id}/`, userProfile);
                commit('setUser', response.data);
                alert('User profile updated successfully!');
            } catch (error) {
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