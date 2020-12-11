<template>
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
              <nuxt-link class="nav-link" :to="`/me/murmurs`">My murmurs</nuxt-link>
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
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
}
</script>

<style>
</style>
