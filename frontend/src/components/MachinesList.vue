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
                <tr v-for="machine in machines" :key="machine.id">
                    <td @click="viewMachineDetails(machine.id)" class="clickable-machine-name">{{ machine.name }}</td>
                    <td>{{ machine.os }}</td>
                    <td>{{ machine.product_type }}</td>
                    <td>
                        <button @click="deregisterMachine(machine.id)">X</button>
                    </td>
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
import axios from 'axios';

export default {
    data() {
        return {
            machines: [], 
            searchQuery: '', 
        };
    },
    methods: {
        search() {
        },
        viewMachineDetails(machineId) {
            this.$router.push({ name: 'machine-details', params: { id: machineId } });
        },
        deregisterMachine(machineId) {
            const confirmDeletion = confirm('Are you sure you want to deregister this machine?');

            if (confirmDeletion) {
                axios.delete(`http://localhost:8000/api/machines/${machineId}/`)
                    .then(response => {
                        console.log('Machine deregistered:', response.data);
                        this.fetchMachines();
                    })
                    .catch(error => {
                        console.error('Error deregistering machine:', error);
                    });
            }
        },
        registerNewMachine() {
            this.$router.push({ name: 'machine-details', params: { id: 'new' } });
        },
        fetchMachines() {
            axios.get('http://localhost:8000/api/machines/')
                .then(response => {
                    this.machines = response.data;
                })
                .catch(error => {
                    console.error('Error fetching machines:', error);
                });
        },
    },
    created() {
        this.fetchMachines();
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

th,
td {
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

.clickable-machine-name {
    cursor: pointer;
    color: #6200ea;
    /* Adjust the color to your preference */
    text-decoration: underline;
    font-weight: bold;
}
</style>