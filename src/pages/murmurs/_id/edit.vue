<template>
  <div>
    <h1>Murmur</h1>
    <div>
      Editing murmum {{ murmur.id }}
      <nuxt-link :to="`/murmurs/${murmur.id}`">
        <button class="btn btn-primary">Go back to show</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  middleware: 'auth',
  props: ['murmur'],
  head: {
    title: `Edit`
  },
}
</script>