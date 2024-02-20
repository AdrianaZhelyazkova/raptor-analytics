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
  
        <button type="submit">{{ isNewMachine ? 'Register Machine' : 'Save Changes' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        machine: {
          name: '',
          os: '',
          product_type: '',
        },
        isNewMachine: false,
      };
    },
    methods: {
      saveMachineDetails() {
        if (this.isNewMachine) {
          this.createNewMachine();
        } else {
          this.saveExistingMachine();
        }
      },
      createNewMachine() {
        axios.post('http://localhost:8000/api/machines/', this.machine)
          .then(response => {
            console.log('New machine created:', response.data);
            this.$router.push('/machines');
          })
          .catch(error => {
            console.error('Error creating new machine:', error);
          });
      },
      saveExistingMachine() {
        axios.put(`http://localhost:8000/api/machines/${this.$route.params.id}/`, this.machine)
          .then(response => {
            console.log('Machine details updated:', response.data);
            this.$router.push('/machines');
          })
          .catch(error => {
            console.error('Error updating machine details:', error);
          });
      },
      fetchMachineDetails() {
        axios.get(`http://localhost:8000/api/machines/${this.$route.params.id}/`)
          .then(response => {
            this.machine = response.data;
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