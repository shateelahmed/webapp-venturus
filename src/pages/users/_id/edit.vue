<template>
  <div>
    <h1>User</h1>
    <div>
      Editing {{ user.name }}
      <nuxt-link :to="`/users/${user.id}`">
        <button>Go back to show</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['user'],
  head: {
    title: `Edit`
  },
}
</script>