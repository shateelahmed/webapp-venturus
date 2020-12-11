<template>
  <div>
    <div v-if="$store.state.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+$store.state.message.alertType" role="alert">
      {{ $store.state.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Alert",
  props: [],
}
</script>