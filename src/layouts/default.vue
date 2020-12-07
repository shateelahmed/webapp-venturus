<template>
  <div>
    <div id="navbar">
      <div class="navbar-links">
        <nuxt-link :to="`/`">Home</nuxt-link>
        <nuxt-link :to="`/users`">Users</nuxt-link>
        <nuxt-link :to="`/murmurs`">Murmurs</nuxt-link>
      </div>
    </div>
    <div id="container">
      <nuxt />
    </div>
    <!-- <footer>
        footer
    </footer> -->
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
}
</script>

<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  #navbar {
    height: 40px;
    width: 100%;
    background-color: #333;
  }
  #navbar a {
    color: white;
    text-decoration: none;
    margin-right: 10px;
  }
  .navbar-links {
    max-width: 800px;
    margin: auto;
  }
  #container {
    max-width: 800px;
    margin: auto;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .card {
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 20px;
    box-shadow: black;
  }
  .card-body {
    padding: 10px;
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  .card-footer-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 20%;
    max-width: 50%;
  }
  .card-footer-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 20%;
  }
  button {
    border-radius: 5px;
  }
  .like-button {
    background-color: #28A745;
    color: white;
  }
  .like-button:hover {
    background-color: green;
  }
  .edit-button {
    background-color: #007BFF;
    color: white;
  }
  .edit-button:hover {
    background-color: blue;
  }
  .delete-button {
    background-color: #DC3545;
    color: white;
  }
  .delete-button:hover {
    background-color: firebrick;
  }

</style>
