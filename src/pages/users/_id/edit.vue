<template>
  <div>
    <h1>User</h1>
    <div>
      Editing user {{ user.name }}
      <nuxt-link :to="`/users/${user.id}`">
        <button class="btn btn-primary">Go back to show</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  middleware: 'auth',
  props: ['user'],
  head: {
    title: `Edit`
  },
}
</script>