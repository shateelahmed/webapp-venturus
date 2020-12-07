<template>
  <div>
    <h1>Users</h1>
    <div v-for="user in data" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
  async asyncData({ $axios }: { $axios:any }): Promise<object> {
    const res = await $axios.$get('http://localhost:8080/api/users')
    console.log(res)
    return {
      data: res,
    }
  },
}
</script>
