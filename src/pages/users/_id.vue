<template>
  <div>
    <nuxt-child :user="user" />
  </div>
</template>

<script lang="ts">
export default {
  head(): any {
    return {
      titleTemplate: `%s user`,
      title: ``,
    }
  },
  data() {
    return {}
  },
  async asyncData(context: any): Promise<object> {
    const user = await context.$axios.$get(`/users/${context.params.id}`)
    const murmurs = await context.$axios.$get(`/users/${context.params.id}/murmurs`)
    // console.log(user);

    return {
      user,
      murmurs
    }
  },
}
</script>