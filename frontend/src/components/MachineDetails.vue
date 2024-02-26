<template>
  <div class="machine-details">
    <h2>{{ isNewMachine ? 'Register New Machine' : 'Edit Machine' }}</h2>
    <form @submit.prevent="saveMachineDetails">
      <div class="form-group">
        <label for="machineName">Machine Name:</label>
        <input type="text" v-model="machine.name" id="machineName" required>
      </div>

      <div class="form-group">
        <label for="operatingSystem">Operating System:</label>
        <select v-model="machine.os" id="product_type" required>
          <option v-for="(option, index) in osOptions" :key="index" :value="option.value">{{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="product_type">Product Type:</label>
        <select v-model="machine.product_type" id="product_type" required>
          <option v-for="(option, index) in productTypeOptions" :key="index" :value="option.value">{{ option.label }}
          </option>
        </select>
      </div>

      <div v-if="!isNewMachine">
        <machine-events v-if="machine.events.length > 0" :events="machine.events" />

        <button type="button" @click="openModal">Add Event</button>

        <event-details :is-open="isModalOpen" @close="closeModal" @add-event="handleAddEvent" />

      </div>

      <button type="submit">{{ isNewMachine ? 'Register Machine' : 'Save Changes' }}</button>
    </form>
  </div>
</template>
  
<script>
import EventDetails from './EventDetails.vue';
import MachineEvents from './MachineEvents.vue'
import { osOptions, productTypeOptions } from '@/enums';

export default {
  components: {
    EventDetails,
    MachineEvents,
  },
  data() {
    return {
      machine: {
        name: '',
        os: '',
        product_type: '',
        events: [],
      },
      isNewMachine: false,
      isModalOpen: false,
      osOptions,
      productTypeOptions,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleAddEvent(newEvent) {
      this.machine.events.push(newEvent);
    },
    saveMachineDetails() {
      if (this.isNewMachine) {
        this.createNewMachine();
      } else {
        this.saveExistingMachine();
      }
    },
    async createNewMachine() {
      await this.$store.dispatch('machine/createMachine', this.machine);
      this.$router.push('/machines');
    },
    async saveExistingMachine() {
      await this.$store.dispatch('machine/updateMachine', { id: this.$route.params.id, machineData: this.machine });
    },
    async fetchMachineDetails() {
      await this.$store.dispatch('machine/getCurrentMachine', this.$route.params.id);
      this.machine = await this.$store.getters['machine/getCurrentMachine'];
    }
  },
  async created() {
    this.isNewMachine = this.$route.params.id === 'new';

    if (!this.isNewMachine) {
      await this.fetchMachineDetails();
    }
  },
};
</script>
  
<style scoped>
.machine-details {
  margin: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
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