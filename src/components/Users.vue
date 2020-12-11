<template>
  <div>
    <h1>Users</h1>
    <div v-for="user in users" :key="user.id">
      <User
        :user="user"
        :followUser="followUser"
        :unfollowUser="unfollowUser"
      />
    </div>
  </div>
</template>

<script>
  import User from './User';

  export default {
    name: "Users",
    components: {
      User
    },
    data() {
      return {}
    },
    props: ["users", "followUser", "unfollowUser"]
  }
</script>