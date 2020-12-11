<template>
  <div>
    <div v-if="message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+message.alertType" role="alert">
      {{ message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <h1>Murmurs of {{ user.name }}</h1>
    <Murmurs
      :murmurs="murmurs"
      :likeMurmur="likeMurmur"
      :deleteMurmur="deleteMurmur"
    />
  </div>
</template>

<script>
import Murmur from '../../../components/Murmur';
export default {
  props: ['user'],
  head: {
    title: 'murmurs of user',
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
    const murmurs = await context.$axios.$get(`/users/me/murmurs`)
    // console.log(murmurs);

    return {
      murmurs: murmurs,

    }
  },
  methods: {
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
          .then(async (res) => {
            this.setMessage('success', res)
            this.murmurs = await this.$axios.$get('/murmurs')
          })
          .catch((err) => {
            this.setMessage('danger', err.response.data)
          })
      }
    },
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
    },
    async setMessage(alertType, text) {
      this.message.alertType = alertType
      this.message.text = text
    }
  },
}
</script>

<style>
</style>