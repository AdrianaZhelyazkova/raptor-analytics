import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('auth_token');
const config = {
    headers: {
        Authorization: `Token ${token}`,
    }
};

export default {
    namespaced: true,

    state: {
        events: [],
        queriedEvents: [],
        nameOptions: [],
    },

    mutations: {
        setEvents(state, events) {
            state.events = events;
        },

        setQueriedEvents(state, events) {
            state.queriedEvents = events;
        },

        setMeanDuration(state, duration) {
            state.meanDuration = duration;
        },

        setNameOptions(state, nameOptions) {
            state.nameOptions = nameOptions;
        }
    },

    actions: {
        async fetchEvents({ commit }) {
            try {
                const response = await axios.get('http://localhost:8000/api/events/', config);
                commit('setEvents', response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        },

        async createEvent({ dispatch }, eventData) {
            try {
                await axios.post('http://localhost:8000/api/events/', eventData, config);
                dispatch('fetchEvents');
            } catch (error) {
                console.error('Error creating event:', error);
            }
        },

        async queryEvents({ commit }, criteria) {
            try {
                const response = await axios.get('http://localhost:8000/api/events/query_events/', {
                    params: criteria,
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                commit('setQueriedEvents', response.data.queried_events);
                commit('setMeanDuration', response.data.mean_duration);


            } catch (error) {
                console.error('Error querying events:', error);
            }
        },

        async fetchEventNameOptions({commit}) {
            try {
                const response = await axios.get('http://localhost:8000/api/events/name_options', config);
                commit('setNameOptions', response.data);
            }
            catch(error) {
                console.error('Error fetching event names', error);
            }
        }
    },

    getters: {
        getEvents: state => state.events,
        getQueriedEvents: state => state.queriedEvents,
        getMeanDuration: state => state.meanDuration,
        getNameOptions: state => state.nameOptions,
    },
}