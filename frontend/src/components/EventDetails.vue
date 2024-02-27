<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Add Event</h2>
            <form @submit.prevent="addEvent">
                <div class="form-group">
                    <label for="eventName">Event Name:</label>
                    <select v-model="event.name" id="eventName" required>
                        <option v-for="(option, index) in eventNameOptions" :key="index" :value="option">{{
                            option }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="startingPoint">Starting Point:</label>
                    <input type="text" v-model="event.starting_point" id="startingPoint" required>
                </div>

                <div class="form-group">
                    <label for="finalPoint">Final Point:</label>
                    <input type="text" v-model="event.final_point" id="finalPoint" required>
                </div>

                <div class="form-group">
                    <label for="duration">Duration:</label>
                    <input type="number" v-model="event.duration" id="duration" required>
                </div>

                <button type="submit">Save Event</button>
            </form>
        </div>
    </div>
</template>
  
<script>

export default {
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            event: {
                name: '',
                starting_point: '',
                final_point: '',
                duration: null,
            },
            machineId: null,
            eventNameOptions: [],
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.resetForm();
        },
        async addEvent() {
            const eventData = {
                ...this.event,
                machine: this.$route.params.id
            };
            
            await this.$store.dispatch('event/createEvent', eventData);
            this.$emit('add-event', this.event);
            this.closeModal()
        },
        resetForm() {
            this.event = {
                name: '',
                starting_point: '',
                final_point: '',
                duration: null,
            };
            this.machineId = null;
        },
    },

    async created() {
        await this.$store.dispatch('event/fetchEventNameOptions');
        this.eventNameOptions = await this.$store.getters['event/getNameOptions'];
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #333;
}

.event-details-modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    margin: 0 auto;
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