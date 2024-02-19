<template>
  <div id="app">
    <main-menu @navigate="navigate" @logout="handleLogout"></main-menu>
    <router-view></router-view>
    <!-- <login-form v-if="!loggedIn" @login="handleLogin" @register="handleRegister"></login-form> -->
    <!-- <div v-else>
      <p>Welcome, {{ email }}!</p>
    </div> -->
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue';

export default {
  data() {
    return {
      loggedIn: false,
      email: '',
    };
  },
  methods: {
    // handleLogin() {
    //   this.loggedIn = true;
    //   this.email = "";
    // },
    // handleRegister() {
    //   this.loggedIn = true;
    //   this.email = "";
    // },
    // handleLogout() {
    //   this.loggedIn = false;
    //   this.email = '';
    // },
    navigate(page) {
      alert(`Navigate to ${page}`);
    },
  },
  components: {
    // 'login-form': LoginForm,
    'main-menu': MainMenu,
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
</style>