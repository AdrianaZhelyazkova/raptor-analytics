<template>
  <div id="app">
    <div class="banner">Raptor Analytics</div>
    <main-menu v-if="isLoggedIn"></main-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";

export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  components: {
    "main-menu": MainMenu,
  },
  async created() {
    await this.$store.dispatch("user/fetchCurrentUser");
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  padding: 20px;
}

.banner {
  background-color: #9c27b0;
  padding: 10px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>