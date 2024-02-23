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
        <input type="text" v-model="machine.os" id="operatingSystem" required>
      </div>

      <div class="form-group">
        <label for="product_type">Product Type:</label>
        <input type="text" v-model="machine.product_type" id="product_type" required>
      </div>

      <div>
        <h3>Events</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Starting Point</th>
              <th>Final Point</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in machine.events" :key="event.id">
              <td>{{ event.name }}</td>
              <td>{{ event.starting_point }}</td>
              <td>{{ event.final_point }}</td>
              <td>{{ event.duration }}</td>
              <td><button @click="deleteEvent(event.id)">Delete</button></td>
            </tr>
          </tbody>
        </table>

        <button type="button" @click="openModal">Add Event</button>

        <event-details :is-open="isModalOpen" @close="closeModal" @add-event="handleAddEvent" />

      </div>

      <button type="submit">{{ isNewMachine ? 'Register Machine' : 'Save Changes' }}</button>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import EventDetails from './EventDetails.vue';

export default {
  components: {
    EventDetails
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
    };
  },
  methods: {
    openModal() {
      console.log("aaaa")
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
    createNewMachine() {
      const token = Cookies.get('auth_token');
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        }
      };
      axios.post('http://localhost:8000/api/machines/', this.machine, config)
        .then(response => {
          console.log('New machine created:', response.data);
          this.$router.push('/machines');
        })
        .catch(error => {
          console.error('Error creating new machine:', error);
        });
    },
    saveExistingMachine() {
      const token = Cookies.get('auth_token');
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        }
      };
      axios.put(`http://localhost:8000/api/machines/${this.$route.params.id}/`, this.machine, config)
        .then(response => {
          console.log('Machine details updated:', response.data);
          this.$router.push('/machines');
        })
        .catch(error => {
          console.error('Error updating machine details:', error);
        });
    },
    async fetchMachineDetails() {
      const token = Cookies.get('auth_token');
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        }
      };
      await axios.get(`http://localhost:8000/api/machines/${this.$route.params.id}/`, config)
        .then(response => {
          this.machine = response.data;
          console.log(this.machine)
        })
        .catch(error => {
          console.error('Error fetching machine details:', error);
        });
    },
  },
  created() {
    this.isNewMachine = this.$route.params.id === 'new';

    if (!this.isNewMachine) {
      this.fetchMachineDetails();
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