<template>
  <div>
    <h1>murmur</h1>
    <div>
      Showing murmur {{ murmur.id }}
      <nuxt-link :to="`/murmurs/${murmur.id}/edit`">
        <button>Edit</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['murmur'],
  head: {
    title: `Show`
  },
}
</script>