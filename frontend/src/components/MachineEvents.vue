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
        <tr v-for="event in paginatedEvents" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.starting_point }}</td>
          <td>{{ event.final_point }}</td>
          <td>{{ event.duration }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="events.length > eventsPerPage" class="pagination">
      <button class="page-button" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button class="page-button" @click="nextPage" :disabled="currentPage * eventsPerPage >= events.length">Next</button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    events: Array,
  },
  data() {
    return {
      currentPage: 1,
      eventsPerPage: 5,
    };
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      const lastPage = Math.ceil(this.events.length / this.eventsPerPage);
      if (this.currentPage < lastPage) {
        this.currentPage++;
      }
    },
  },
  computed: {
    paginatedEvents() {
      const startIndex = (this.currentPage - 1) * this.eventsPerPage;
      const endIndex = startIndex + this.eventsPerPage;
      return this.events.slice(startIndex, endIndex);
    },
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