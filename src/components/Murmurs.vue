<template>
  <div>
    <div v-for="murmur in murmurs" :key="murmur.id">
      <Murmur
        :murmur="murmur"
        :likeMurmur="likeMurmur"
        :deleteMurmur="deleteMurmur"
      />
    </div>
  </div>
</template>

<script>
  import Murmur from './Murmur';

  export default {
    name: "Murmurs",
    components: {
      Murmur
    },
    data() {
      return {}
    },
    props: ["murmurs", "likeMurmur", "deleteMurmur"]
  }
</script>