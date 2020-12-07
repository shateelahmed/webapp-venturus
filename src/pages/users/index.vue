<template>
  <div>
    <h1>Users</h1>
    <div v-for="user in users" :key="user.id">
      <nuxt-link :to="`/users/${user.id}`">{{ user.name }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  head: {
    title: 'Users',
  },
  data() {
    return {}
  },
  async asyncData({ $axios }: { $axios:any }): Promise<object> {
    const users = await $axios.$get('/users')
    // console.log(users);

    return {
      users
    }
  },
}
</script>