<template>
  <div>
    <div v-if="this.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+this.message.alertType" role="alert">
      {{ this.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <h1>Details of {{ user.name }}</h1>
    <User
      :user="user"
      :followUser="followUser"
      :unfollowUser="unfollowUser"
    />
    <h1>Murmurs of {{ user.name }}</h1>
    <Murmurs
      :murmurs="murmurs"
      :likeMurmur="likeMurmur"
      :unlikeMurmur="unlikeMurmur"
      :deleteMurmur="deleteMurmur"
    />
  </div>
</template>

<script>
import Murmurs from '../../../components/Murmurs';
import User from '../../../components/User';

export default {
  props: ['user'],
  head: {
    title: `Show`
  },
  data() {
    return {
      message: {
        alertType: '',
        text: '',
      },
    }
  },
  // async asyncData(context: any): Promise<object> {
  async asyncData(context) {
    const murmurs = await context.$axios.$get(`/users/${context.params.id}/murmurs`)
    // console.log(murmurs);

    return {
      murmurs: murmurs,

    }
  },
  methods: {
    async followUser(user_id) {
      await this.$axios.$post(`/users/${user_id}/follow`)
        .then((res) => {
          this.setMessage('success', res)
        })
        .catch((err) => {
          this.setMessage('danger', err.response.data)
        })
    },
    async unfollowUser(user_id) {
      await this.$axios.$post(`/users/${user_id}/unfollow`)
        .then((res) => {
          this.setMessage('success', res)
        })
        .catch((err) => {
          this.setMessage('danger', err.response.data)
        })
    },
    async likeMurmur(murmur_id) {
      await this.$axios.$post(`/murmurs/${murmur_id}/like`)
        .then((res) => {
          this.setMessage('success', res)
        })
        .catch((err) => {
          this.setMessage('danger', err.response.data)
        })
    },
    async unlikeMurmur(murmur_id) {
      await this.$axios.$post(`/murmurs/${murmur_id}/unlike`)
        .then((res) => {
          this.setMessage('success', res)
        })
        .catch((err) => {
          this.setMessage('danger', err.response.data)
        })
    },
    async deleteMurmur(murmur_id) {
      if (confirm("Are you sure you want to delete this murmur?")) {
        await this.$axios.$post(`/murmurs/${murmur_id}/delete`)
          .then((res) => {
            this.setMessage('success', res)
          })
          .catch((err) => {
            this.setMessage('danger', err.response.data)
          })
      }
    },
    async setMessage(alertType, text) {
      this.message.alertType = alertType
      this.message.text = text
    }
  },
}
</script>