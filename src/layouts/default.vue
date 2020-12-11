<template>
  <div>
    <Navbar />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from '../components/Navbar.vue';

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
  components: {
    Navbar
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
    top: 80px;
    right: 20px;
  }
</style>
