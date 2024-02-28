<template>
  <div class="machines-container">
    <h2>Machines</h2>
    <div v-if="machines.length > 0">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by machine name"
        />
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
          <tr v-for="machine in paginatedMachines" :key="machine.id">
            <td
              @click="viewMachineDetails(machine.id)"
              class="clickable-machine-name"
            >
              {{ machine.name }}
            </td>
            <td>{{ machine.os }}</td>
            <td>{{ machine.product_type }}</td>
            <td>
              <div v-if="machine.events.length > 0">
                <div v-if="selectedMachineId === machine.id">
                  <div
                    class="events-modal"
                    v-show="selectedMachineId === machine.id"
                  >
                    <span class="close" @click="closeModal">&times;</span>
                    <machine-events :events="machine.events"></machine-events>
                  </div>
                </div>
                <button @click="viewMachineEvents(machine.id)">
                  View Events
                </button>
              </div>
              <span v-else>No events</span>
            </td>
            <td>
              <button @click="deregisterMachine(machine.id)">X</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="machines.length > machinesPerPage" class="pagination">
        <button
          class="page-button"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span>{{ currentPage }}</span>
        <button
          class="page-button"
          @click="nextPage"
          :disabled="currentPage * machinesPerPage >= machines.length"
        >
          Next
        </button>
      </div>
    </div>
    <div v-else>No registered machines</div>
    <button @click="registerNewMachine">Register New Machine</button>
    <router-view></router-view>
  </div>
</template>
  
<script>
import MachineEvents from "./MachineEvents.vue";

export default {
  components: {
    MachineEvents,
  },
  data() {
    return {
      machines: [],
      searchQuery: "",
      selectedMachineId: null,
      currentPage: 1,
      machinesPerPage: 5,
    };
  },
  methods: {
    search() {},
    viewMachineDetails(machineId) {
      this.$router.push({ name: "machine-details", params: { id: machineId } });
    },
    viewMachineEvents(machineId) {
      this.selectedMachineId =
        this.selectedMachineId === machineId ? null : machineId;
    },
    closeModal() {
      this.selectedMachineId = null;
    },
    async deregisterMachine(machineId) {
      const confirmDeletion = confirm(
        "Are you sure you want to deregister this machine?"
      );

      if (confirmDeletion) {
        await this.$store.dispatch("machine/deleteMachine", machineId);
        this.machines = await this.$store.getters["machine/getMachines"];
      }
    },
    registerNewMachine() {
      this.$router.push({ name: "machine-details", params: { id: "new" } });
    },
    async fetchMachines() {
      await this.$store.dispatch("machine/fetchMachines");
      this.machines = await this.$store.getters["machine/getMachines"];
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      const lastPage = Math.ceil(this.machines.length / this.machinesPerPage);
      if (this.currentPage < lastPage) {
        this.currentPage++;
      }
    },
    filterMachinesByName() {
      return this.machines.filter((machine) => {
        const machineName = machine.name.toLowerCase();
        const searchQuery = this.searchQuery.toLowerCase();
        return machineName.includes(searchQuery);
      });
    },
  },
  computed: {
    paginatedMachines() {
      const filteredMachines = this.filterMachinesByName();
      const startIndex = (this.currentPage - 1) * this.machinesPerPage;
      const endIndex = startIndex + this.machinesPerPage;
      return filteredMachines.slice(startIndex, endIndex);
    },
  },
  async created() {
    await this.fetchMachines();
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
  text-align: center;
}

button {
  background-color: #9c27b0;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.clickable-machine-name {
  cursor: pointer;
  color: #6200ea;
  text-decoration: underline;
  font-weight: bold;
}

.events-modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}

.events-modal.show-modal {
  display: block;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-button {
  background-color: transparent;
  border: 1px solid #9c27b0;
  color: #9c27b0;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.page-button:hover {
  background-color: #9c27b0;
  color: #fff;
}
</style>