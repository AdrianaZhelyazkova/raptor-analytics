<template>
    <div class="user-profile">
        <h2>User Profile</h2>
        <div>
            <form @submit.prevent="updateUserProfile">
                <p><strong>Email:</strong> {{ user.username }}</p>
                <label for="first_name">First name:</label>
                <input type="text" v-model="user.first_name" id="first_name" required> <br>

                <label for="last_name">Last name:</label>
                <input type="last_name" v-model="user.last_name" id="last_name" required> <br>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: {},
        }
    },

    async created() {
        await this.$store.dispatch('user/fetchCurrentUser')
        this.user = await this.$store.getters['user/getUser'];
    },

    methods: {
        updateUserProfile() {
            this.$store.dispatch('user/updateUserProfile', this.user);
            this.user = this.$store.getters['user/getUser'];
        },
    }
};
</script>


