<template>
  <div>
    <div v-if="this.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+this.message.alertType" role="alert">
      {{ this.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <Users
      :users="users"
      :followUser="followUser"
      :unfollowUser="unfollowUser"
    />
  </div>
</template>

<script lang="ts">
import Users from '../components/Users';

export default {
  head: {
    title: 'Users',
  },
  data() {
    return {
      message: {
        alertType: '',
        text: '',
      },
    }
  },
  // async asyncData({ $axios }: { $axios:any }): Promise<object> {
  async asyncData({ $axios }) {
    const users = await $axios.$get('/users')
    // console.log(users);

    return {
      users
    }
  },
  methods: {
    async followUser(user_id) {
      await this.$axios.$post(`/users/${user_id}/follow`)
        .then((res) => {
          this.message.alertType = 'success'
          this.message.text = res
        })
        .catch((err) => {
          this.message.alertType = 'danger'
          this.message.text = err.response.data
        })
    },
    async unfollowUser(user_id) {
      await this.$axios.$post(`/users/${user_id}/unfollow`)
        .then((res) => {
          this.message.alertType = 'success'
          this.message.text = res
        })
        .catch((err) => {
          this.message.alertType = 'danger'
          this.message.text = err.response.data
        })
    }
  },
}
</script>