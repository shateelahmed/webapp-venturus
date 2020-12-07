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

</style>
