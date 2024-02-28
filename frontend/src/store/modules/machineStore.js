import { apiInstance } from '@/services/api';

export default {
  namespaced: true,

  state: {
    machines: [],
    machine: null,
    osOptions: [],
    productTypeOptions: [],
  },

  mutations: {
    setMachines(state, machines) {
      state.machines = machines;
    },

    setCurrentMachine(state, machine) {
      state.machine = machine;
    },

    setOsOptions(state, osOptions) {
      state.osOptions = osOptions;
    },

    setProductTypeOptions(state, productTypeOptions) {
      state.productTypeOptions = productTypeOptions;
    },
  },

  actions: {
    async fetchMachines({ commit }) {
      try {
        const response = await apiInstance.get('machines/');
        await commit('setMachines', response.data);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    },

    async getCurrentMachine({ commit }, id) {
      try {
        const response = await apiInstance.get(`machines/${id}`);
        commit('setCurrentMachine', response.data);
      } catch (error) {
        console.error('Error fetching current machine:', error);
      }
    },

    async createMachine({ dispatch }, machineData) {
      try {
        await apiInstance.post('machines/', machineData);
        dispatch('fetchMachines');
      } catch (error) {
        console.error('Error creating machine:', error);
      }
    },

    async updateMachine({ dispatch }, { id, machineData }) {
      try {
        await apiInstance.put(`machines/${id}/`, machineData);
        dispatch('fetchMachines');
      } catch (error) {
        console.error('Error updating machine:', error);
      }
    },

    async deleteMachine({ dispatch }, machineId) {
      try {
        await apiInstance.delete(`machines/${machineId}/`);
        await dispatch('fetchMachines');
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
    },

    async fetchOsOptions({ commit }) {
      try {
        const response = await apiInstance.get('machines/os_options/');
        commit('setOsOptions', response.data);
      } catch (error) {
        console.error('Error getting OS options', error);
      }
    },

    async fetchProductTypeOptions({ commit }) {
      try {
        const response = await apiInstance.get('machines/product_type_options/');
        commit('setProductTypeOptions', response.data);
      } catch (error) {
        console.error('Error getting Product type options', error);
      }
    },
  },

  getters: {
    getMachines: state => state.machines,
    getMachineById: (state) => (id) => {
      return state.machines.find(machine => machine.id === id);
    },
    getCurrentMachine: state => state.machine,
    getOsOptions: state => state.osOptions,
    getProductTypeOptions: state => state.productTypeOptions,
  },
};