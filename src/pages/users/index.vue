<template>
  <div>
    <div v-if="this.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+this.message.alertType" role="alert">
      {{ this.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <h1>Users</h1>
    <div v-for="user in users" :key="user.id">
      <div class="card mt-3">
        <div class="card-body">
          <nuxt-link class="btn btn-link" :to="`/users/${user.id}`">{{ user.name }}</nuxt-link>
          Email: {{ user.email }}
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col">
              <span class="author">
                Murmurs 
                <nuxt-link :to="`/users/${user.id}/murmurs`">
                  {{ user.murmurs }}
                </nuxt-link>
              </span>
              Followers: <span class="badge bg-success">{{ user.followers }}</span>
              Follows: <span class="badge bg-success">{{ user.follows }}</span>
            </div>
            <div class="col">
              <div v-if="$auth.loggedIn">
                <button class="btn btn-success btn-sm" v-if="user.id != $auth.user.id" @click="followUser(user.id)">Follow</button>
              </div>
              <div v-else>
                <nuxt-link :to="`/login`">
                  <button class="btn btn-success btn-sm">Follow</button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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