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
export default {
  methods: {
    navigate(page) {
      this.$router.push(page);
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/sign-in");
    },
  },
};
</script>
  
<style scoped>
.main-menu {
  background-color: #9c27b0;
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
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