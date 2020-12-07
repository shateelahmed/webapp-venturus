<template>
  <div>
    <nuxt-child :user="user" />
  </div>
</template>

<script lang="ts">
export default {
  head(): any {
    return {
      titleTemplate: `%s user ${this.user.name}`,
      title: ``,
    }
  },
  data() {
    return {}
  },
  async asyncData(context: any): Promise<object> {
    const user = await context.$axios.$get(`/users/${context.params.id}`)
    // console.log(user);

    return {
      user
    }
  },
}
</script>