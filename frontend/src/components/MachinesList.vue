<template>
    <div class="machines-container">
      <h2>Machines</h2>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search by machine name">
        <button @click="search">Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Operating System</th>
            <th>Product Type</th>
            <th>Events</th>
            <th>Deregister</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in filteredMachines" :key="machine.id" @click="viewMachineDetails(machine.id)">
            <td>{{ machine.name }}</td>
            <td>{{ machine.os }}</td>
            <td>{{ machine.productType }}</td>
            <td>Events</td>
            <td>
                <button @click="deregisterMachine(machine.id)">X</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="registerNewMachine">Register New Machine</button>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        machines: [], 
        searchQuery: '', 
      };
    },
    computed: {
      filteredMachines() {
        return this.machines.filter(machine =>
          machine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      search() {
      },
      viewMachineDetails(machineId) {
        this.$router.push({ name: 'machine-details', params: { id: machineId } });
      },
      deregisterMachine(machineId) {
        console.log(machineId);
      },
      registerNewMachine() {
        this.$router.push({ name: 'machine-details', params: { id: 'new' } });
      },
    },
    created() {
    },
  };
  </script>
  
  <style scoped>
  .machines-container {
    margin: 20px;
  }
  
  .search-bar {
    margin-bottom: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    background-color: #9c27b0;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>