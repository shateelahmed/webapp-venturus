<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" :to="`/`">Murmurer</nuxt-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/users`">Users</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/murmurs`">Murmurs</nuxt-link>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0" v-if="$auth.loggedIn">
            <li class="nav-item">
              <a class="nav-link" href="#">{{ $auth.user.email }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="$auth.logout()">Logout</a>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0" v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/login`">Login</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/register`">Register</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <nuxt />
    </div>
  </div>
  <!-- <div>
    <div class="navbar">
      <div class="navbar-links">
        <nuxt-link :to="`/`">Home</nuxt-link>
        <nuxt-link :to="`/users`">Users</nuxt-link>
        <nuxt-link :to="`/murmurs`">Murmurs</nuxt-link>
      </div>
      <div class="navbar-links" v-if="$auth.loggedIn">
        <span>{{ $auth.user.email }}</span>
        <nuxt-link :to="`/logout`">Logout</nuxt-link>
      </div>
      <div class="navbar-links" v-else>
        <nuxt-link :to="`/login`">Login</nuxt-link>
        <nuxt-link :to="`/register`">Register</nuxt-link>
      </div>
    </div>
    <div class="container">
      <nuxt />
    </div>
  </div> -->
</template>

<script lang="ts">
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
        }
      ],
    }
  },
  data() {
    return {}
  },
}
</script>

<style>
  body {
    padding-top: 70px;
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .card:hover {
    box-shadow: 0 0 0 1px rgba(3, 252, 144, 0.2), 0 6px 20px 0 rgba(3, 252, 144, 0.19);
    transition: all 200ms ease-out;
  }
  /* *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100%;
    background-color: #333;
  } */
  /* .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    border: 1px solid white;
  } */
  /* .navbar-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .navbar a {
    color: white;
    text-decoration: none;
    padding: 8px 10px;
  }
  .navbar a:hover {
    background-color: black;
  }
  .navbar-links {
    max-width: 800px;
    margin: auto;
  }
  .container {
    max-width: 800px;
    margin: auto;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  } */

</style>
