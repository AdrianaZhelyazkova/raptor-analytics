<template>
  <div class="register-container">
    <h2>User Registration</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="firstName">First name:</label>
        <input
          type="text"
          v-model="userData.first_name"
          id="firstName"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last name:</label>
        <input
          type="text"
          v-model="userData.last_name"
          id="lastName"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="userData.username" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="userData.password"
          id="password"
          required
        />
      </div>

      <div class="form-group">
        <button type="submit">Register</button>
        <button @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      userData: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      await this.$store.dispatch("user/register", this.userData);
      this.$router.push("/machines");
    },

    cancel() {
      this.$router.push("/sign-in");
    }
  },
};
</script>
  
<style scoped>
.register-container {
  background-color: #6a1b9a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
  width: 300px;
  margin-top: 15px;
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
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group button {
  background-color: #9c27b0;
  color: #fff;
  border: none;
  padding: 12px 20px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>