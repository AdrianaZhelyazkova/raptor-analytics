<template>
    <div class="machines-container">
        <h2>Machines</h2>
        <div v-if="machines.length > 0">
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
                        <div v-if="machine.events.length > 0">
                            <div v-if="selectedMachineId === machine.id">
                                <button @click="viewMachineEvents(machine.id)">Hide Events</button>
                                <machine-events :events="machine.events"></machine-events>
                            </div>
                            <span v-else>
                                <button @click="viewMachineEvents(machine.id)">View Events</button>
                            </span>
                        </div>
                        <span v-else>No events</span>
                    </td>
                    <td>
                        <button @click="deregisterMachine(machine.id)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        <div v-else>
            No registered machines
        </div>
        <button @click="registerNewMachine">Register New Machine</button>
        <router-view></router-view>
    </div>
</template>
  
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import MachineEvents from './MachineEvents.vue';

export default {
    components: {
        MachineEvents,
    },
    data() {
        return {
            machines: [],
            searchQuery: '',
            selectedMachineId: null,
        };
    },
    methods: {
        search() {
        },
        viewMachineDetails(machineId) {
            this.$router.push({ name: 'machine-details', params: { id: machineId } });
        },
        viewMachineEvents(machineId) {
            this.selectedMachineId = this.selectedMachineId === machineId ? null : machineId;
        },
        deregisterMachine(machineId) {
            const confirmDeletion = confirm('Are you sure you want to deregister this machine?');

            if (confirmDeletion) {
                const token = Cookies.get('auth_token');
                const config = {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                };
                axios.delete(`http://localhost:8000/api/machines/${machineId}/`, config)
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
            const token = Cookies.get('auth_token');
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                }
            };
            axios.get('http://localhost:8000/api/machines/', config)
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