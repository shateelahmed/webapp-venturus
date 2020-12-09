<template>
  <div>
    <h1>Murmur</h1>
    <div>
      Showing murmur {{ murmur.id }}
      <nuxt-link :to="`/murmurs/${murmur.id}/edit`">
        <button class="btn btn-primary">Edit</button>
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