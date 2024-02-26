<template>
    <div class="main-menu">
        <ul>
            <router-link to="/machines">
                <li>Machines</li>
            </router-link>
            <router-link to="/events">
                <li>Events</li>
            </router-link>
            <router-link to="/user-profile">
                <li>User Profile</li>
            </router-link>
            <li @click="logout">Logout</li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    methods: {
        navigate(page) {
            this.$router.push(page);
        },
        logout() {
            axios.post('http://localhost:8000/api/users/logout/')
                .then(() => {
                    Cookies.remove('auth_token');
                    this.$store.commit('setUser', null);
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Error logging in user:', error);
                });
        },
    },
};
</script>
  
<style scoped>
.main-menu {
    background-color: #9c27b0;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}

.banner {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
}

li {
    cursor: pointer;
    color: #fff;
}

li:hover {
    text-decoration: underline;
}
</style>