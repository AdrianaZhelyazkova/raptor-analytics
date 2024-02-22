<template>
    <div class="user-profile">
        <h2>User Profile</h2>
        <div>
            <form @submit.prevent="updateUserProfile">
                <p><strong>Email:</strong> {{ user.username }}</p>
                <label for="first_name">First name:</label>
                <input type="text" v-model="user.first_name" id="first_name" required>

                <label for="last_name">Last name:</label>
                <input type="last_name" v-model="user.last_name" id="last_name" required>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            user: null,
        }
    },

    async created() {
        await this.$store.dispatch('login');
        this.user = this.$store.getters.getUser;

        console.log(this.user)
    },

    methods: {
        updateUserProfile() {
            const token = Cookies.get('auth_token');
            console.log(token)
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                }
            };
            axios.put('http://localhost:8000/api/users/' + this.user.id + '/', this.user, config)
                .then(response => {
                    this.user = { ...response.data.user };
                    alert('User profile updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating user profile:', error);
                    alert('Error updating user profile. Please try again.');
                });
        },
    }
};
</script>


