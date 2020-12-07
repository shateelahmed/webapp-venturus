<template>
  <div>
    <h1>User</h1>
    <div>
      Showing user {{ user.name }}
      <nuxt-link :to="`/users/${user.id}/edit`">
        <button>Edit</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['user'],
  head: {
    title: `Show`
  },
}
</script>