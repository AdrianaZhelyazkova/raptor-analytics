<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div>
      <form @submit.prevent="updateUserProfile" class="user-profile-form">
        <p><strong>Email:</strong> {{ user.username }}</p>
        <div class="form-group">
          <label for="first_name">First name:</label>
          <input
            type="text"
            v-model="user.first_name"
            id="first_name"
            required
          />
        </div>
        <div class="form-group">
          <label for="last_name">Last name:</label>
          <input type="text" v-model="user.last_name" id="last_name" required />
        </div>
        <button type="submit" class="save-button">Save Changes</button>
      </form>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      user: {},
    };
  },

  async created() {
    await this.$store.dispatch("user/fetchCurrentUser");
    this.user = await this.$store.getters["user/getUser"];
  },

  methods: {
    async updateUserProfile() {
      await this.$store.dispatch("user/updateUserProfile", this.user);
      this.user = await this.$store.getters["user/getUser"];
    },
  },
};
</script>
  
<style scoped>
.user-profile {
  margin: 20px;
}

.user-profile-form {
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
  margin-top: 5px;
}

button.save-button {
  background-color: #9c27b0;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button.save-button:hover {
  background-color: #7b1fa2;
}
</style>