import { apiInstance } from '@/services/api'

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
                const response = await apiInstance.get('events/');
                commit('setEvents', response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        },

        async createEvent({ dispatch }, eventData) {
            try {
                await apiInstance.post('events/', eventData);
                dispatch('fetchEvents');
            } catch (error) {
                console.error('Error creating event:', error);
            }
        },

        async queryEvents({ commit }, criteria) {
            try {
                const response = await apiInstance.get('events/query_events/', {
                    params: criteria
                });
                commit('setQueriedEvents', response.data.queried_events);
                commit('setMeanDuration', response.data.mean_duration);


            } catch (error) {
                console.error('Error querying events:', error);
            }
        },

        async fetchEventNameOptions({ commit }) {
            try {
                const response = await apiInstance.get('events/name_options/');
                commit('setNameOptions', response.data);
            }
            catch (error) {
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