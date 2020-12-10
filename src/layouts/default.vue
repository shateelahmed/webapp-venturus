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
              <!-- <nuxt-link class="nav-link" :to="`/murmurs`">Timeline</nuxt-link> -->
              <nuxt-link class="nav-link" :to="`/`">Timeline</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/users`">Users</nuxt-link>
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
</template>

<script lang="ts">
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
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
  .alert-fixed {
    z-index: 2000;
    position: fixed;
    width: fit-content(20em);
    bottom: 20px;
    right: 20px;
  }
</style>
