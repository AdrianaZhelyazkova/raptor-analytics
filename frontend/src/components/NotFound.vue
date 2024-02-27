<template>
    <div class="not-found">
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <router-link to="/">Go to Homepage</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin: 50px;
  }
  
  h2 {
    color: #e53935;
  }
  </style>