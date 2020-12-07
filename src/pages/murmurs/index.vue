<template>
  <div>
    <h1>murmurs</h1>
    <div v-for="murmur in murmurs" :key="murmur.id">
      <nuxt-link :to="`/murmurs/${murmur.id}`">{{ murmur.id }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  head: {
    title: 'murmurs',
  },
  data() {
    return {}
  },
  async asyncData({ $axios }: { $axios:any }): Promise<object> {
    const murmurs = await $axios.$get('/murmurs')
    // console.log(murmurs);

    return {
      murmurs
    }
  },
}
</script>