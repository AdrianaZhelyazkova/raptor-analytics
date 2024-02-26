import Cookies from "js-cookie";
import axios from "axios";

const token = Cookies.get('auth_token');
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                }
            };
            
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
            await axios.get('http://localhost:8000/api/users/current_user/', config)
                .then(response => {
                    commit('setUser', response.data.user);
                });
        },

        async register({ commit }, userData) {
            try {
                const response = await axios.post('http://localhost:8000/api/users/', userData);
                commit('setLoggedIn', true);
                commit('setUser', response.data);
            }

            catch (error) {
                console.error('Error registering user:', error);
            }
        },

        async logout({ commit }) {
            try {
                await axios.post('http://localhost:8000/api/users/logout/')
                Cookies.remove('auth_token');
                commit('setUser', null);
            }
            catch (error) {
                console.error('Error logging in user:', error);
            }
        },

        async updateUserProfile({commit}, userProfile) {
            try {
                const response = await axios.put(`http://localhost:8000/api/users/${userProfile.id}/`, userProfile, config)
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