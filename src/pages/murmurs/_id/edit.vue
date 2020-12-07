<template>
  <div>
    <h1>murmur</h1>
    <div>
      Editing {{ murmur.id }}
      <nuxt-link :to="`/murmurs/${murmur.id}`">
        <button>Go back to show</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['murmur'],
  head: {
    title: `Edit`
  },
}
</script>