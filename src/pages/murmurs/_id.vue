<template>
  <div>
    <nuxt-child :murmur="murmur" />
  </div>
</template>

<script lang="ts">
export default {
  head(): any {
    return {
      titleTemplate: `%s murmur`,
      title: ``,
    }
  },
  data() {
    return {}
  },
  async asyncData(context: any): Promise<object> {
    const murmur = await context.$axios.$get(`/murmurs/${context.params.id}`)
    // console.log(murmur);

    return {
      murmur
    }
  },
}
</script>