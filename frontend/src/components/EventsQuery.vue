<template>
    <div class="events-query-container">
        <h2>Events Query</h2>
        <div class="query-form">
            <label for="starting_point">Starting point:</label>
            <input v-model="queryCriteria.starting_point" id="starting_point" />
            <label for="final_point">Final point:</label>
            <input v-model="queryCriteria.final_point" id="final_point" />
            <label for="machine_os">Machine OS:</label>
            <input v-model="queryCriteria.machine_os" id="machine_os" />
            <label for="product_type">Product type:</label>
            <input v-model="queryCriteria.product_type" id="product_type" />
            <button @click="queryEvents">Query Events</button>
        </div>
        <div v-if="queriedEvents.length > 0">
            <h3>Queried Events</h3>
            <ul>
                <li v-for="event in queriedEvents" :key="event.id">
                    {{ event.name }} - Starting Point: {{ event.starting_point }} - Final Point: {{ event.final_point }}
                </li>
            </ul>

            <p>Estimated Duration: {{ estimatedDuration }} seconds</p>
        </div>
        <div v-else>
            <p>No events found for the given criteria.</p>
        </div>
    </div>
</template>
  
<script>
import Cookies from 'js-cookie';
import axios from 'axios';
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
        };
    },
    methods: {
        async queryEvents() {
            try {
                const token = Cookies.get('auth_token');
                const response = await axios.get('http://localhost:8000/api/events/query_events/', {
                    params: this.queryCriteria,
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });

                this.queriedEvents = response.data.queried_events;
                this.estimatedDuration = response.data.mean_duration;
            } catch (error) {
                console.error('Error querying events:', error);
            }
        },
    },
};
</script>
  
<style scoped>
.events-query-container {
    margin: 20px;
}

.query-form {
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}
</style>