<template>
    <div class="login-container">
        <h2>Login</h2>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" v-model="loginData.username" id="email" placeholder="Enter your email">
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="loginData.password" id="password" placeholder="Enter your password">
        </div>
        <div class="form-group">
            <button @click="login">Login</button>
            <button @click="register">Register</button>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            loginData: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        async login() {
            await this.$store.dispatch('user/login', this.loginData);
            this.$router.push('/machines');
        },
        register() {
            this.$router.push('/register');
        },
    },
};
</script>
  
<style scoped>
.login-container {
    background-color: #6a1b9a;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #fff;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group button {
    background-color: #9c27b0;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
}
</style>