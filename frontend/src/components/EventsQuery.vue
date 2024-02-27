<template>
    <div class="events-query-container">
        <h2>Events Query</h2>
        <form @submit.prevent="queryEvents" class="query-form">
            <div class="form-group">
                <label for="starting_point">Starting point:</label>
                <input v-model="queryCriteria.starting_point" id="starting_point" required />
            </div>
            <div class="form-group">
                <label for="final_point">Final point:</label>
                <input v-model="queryCriteria.final_point" id="final_point" required />
            </div>
            <div class="form-group">
                <label for="machine_os">Machine OS:</label>
                <select v-model="queryCriteria.machine_os" id="product_type" required>
                    <option v-for="(option, index) in osOptions" :key="index" :value="option">{{ option }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="product_type">Product type:</label>
                <select v-model="queryCriteria.product_type" id="product_type" required>
                    <option v-for="(option, index) in productTypeOptions" :key="index" :value="option">{{ option
                    }}
                    </option>
                </select>
            </div>
            <button type="submit">Query Events</button>
        </form>
        <div v-if="queriedEvents.length > 0">
            <h3>Estimated Duration: {{ estimatedDuration }} seconds</h3>
            <h3>Queried Events</h3>
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Event Name</th>
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
                        <td>{{ event.duration }} seconds</td>
                    </tr>
                </tbody>
                <div v-if="queriedEvents.length > eventsPerPage" class="pagination">
                    <button class="page-button" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                    <span>{{ currentPage }}</span>
                    <button class="page-button" @click="nextPage"
                        :disabled="currentPage * eventsPerPage >= queriedEvents.length">Next</button>
                </div>
            </table>
        </div>
        <div v-if="queryExecuted && queriedEvents.length === 0">
            <p>No events found for the given criteria.</p>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            queryCriteria: {
                starting_point: '',
                final_point: '',
                machine_os: '',
                product_type: '',
            },
            queriedEvents: [],
            estimatedDuration: null,
            osOptions: [],
            productTypeOptions: [],
            queryExecuted: false,
            currentPage: 1,
            eventsPerPage: 5,
        };
    },
    methods: {
        async queryEvents() {
            this.queryExecuted = true;
            await this.$store.dispatch('event/queryEvents', this.queryCriteria);
            this.queriedEvents = this.$store.getters['event/getQueriedEvents'];
            this.estimatedDuration = this.$store.getters['event/getMeanDuration'];
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {
            const lastPage = Math.ceil(this.queriedEvents.length / this.eventsPerPage);
            if (this.currentPage < lastPage) {
                this.currentPage++;
            }
        },
    },
    computed: {
        paginatedEvents() {
            const startIndex = (this.currentPage - 1) * this.eventsPerPage;
            const endIndex = startIndex + this.eventsPerPage;
            return this.queriedEvents.slice(startIndex, endIndex);
        },
    },

    async created() {
        await this.$store.dispatch('machine/fetchOsOptions');
        await this.$store.dispatch('machine/fetchProductTypeOptions');

        this.osOptions = await this.$store.getters['machine/getOsOptions'];
        this.productTypeOptions = await this.$store.getters['machine/getProductTypeOptions'];
    },
};
</script>
  
<style scoped>
.events-query-container {
    margin: 20px;
}

.query-form {
    max-width: 400px;
    margin: auto;
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
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
}

button {
    background-color: #9c27b0;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.events-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.events-table th,
.events-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.events-table th {
    background-color: #f2f2f2;
    text-align: center;
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