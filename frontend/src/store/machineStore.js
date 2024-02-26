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
    machines: [],
    machine: null,
  },

  mutations: {
    setMachines(state, machines) {
      state.machines = machines;
    },

    setCurrentMachine(state, machine) {
      state.machine = machine;
    }
  },

  actions: {
    async fetchMachines({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/machines/', config);
        commit('setMachines', response.data);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    },

    async getCurrentMachine({commit}, id){
      try {
        const response = await axios.get(`http://localhost:8000/api/machines/${id}`, config);
        commit('setCurrentMachine', response.data);
      } catch (error) {
        console.error('Error fetching current machine:', error);
      }
    },

    async createMachine({ dispatch }, machineData) {
      try {
        await axios.post('http://localhost:8000/api/machines/', machineData, config);
        dispatch('fetchMachines');
      } catch (error) {
        console.error('Error creating machine:', error);
      }
    },

    async updateMachine({ dispatch }, { id, machineData }) {
      try {
        await axios.put(`http://localhost:8000/api/machines/${id}/`, machineData, config);
        dispatch('fetchMachines');
      } catch (error) {
        console.error('Error updating machine:', error);
      }
    },

    async deleteMachine({ dispatch }, machineId) {
      try {
        await axios.delete(`http://localhost:8000/api/machines/${machineId}/`, config);
        dispatch('fetchMachines');
      } catch (error) {
        console.error('Error deleting machine:', error);
      }
    },
  },

  getters: {
    getMachines: state => state.machines,
    getMachineById: (state) => (id) => {
      return state.machines.find(machine => machine.id === id);
    },
    getCurrentMachine: state => state.machine,
  },
};