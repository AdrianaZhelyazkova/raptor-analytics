<template>
    <div class="not-found">
      <h2>401 - Not Authorized</h2>
      <p>Sorry, you are not authorized to view the requested resource.</p>
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