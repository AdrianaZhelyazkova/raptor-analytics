<template>
    <div class="machine-events-container">
      <h3>Machine Events</h3>
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
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.name }}</td>
            <td>{{ event.starting_point }}</td>
            <td>{{ event.final_point }}</td>
            <td>{{ event.duration }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      events: Array,
    },
  };
  </script>

<style scoped>
.machine-events-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

h3 {
  color: #9c27b0;
  margin-bottom: 10px;
}
</style>