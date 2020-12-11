<template>
  <div>
    <div v-if="this.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+this.message.alertType" role="alert">
      {{ this.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <h1>Details of {{ user.name }}</h1>
    <div class="card">
      <div class="card-body">
        <nuxt-link class="btn btn-link" :to="`/users/${user.id}`">{{ user.name }}</nuxt-link>
        Email: {{ user.email }}
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col">
            <span class="author">
              Murmurs <span class="badge bg-info">{{ user.murmurs }}</span>
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
    <h1>Murmurs of {{ user.name }}</h1>
    <div v-for="murmur in murmurs" :key="murmur.id">
      <div class="card mt-3">
        <div class="card-body">
          {{ murmur.description }}
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col">
              <span class="author">
                <i class="fas fa-user"></i> 
                <nuxt-link class="btn btn-link btn-sm" :to="`/users/${murmur.user_id}`">
                  {{ murmur.user_name }}
                </nuxt-link>
              </span>
              <i class="fas fa-heart"></i> <span class="badge bg-success">{{ murmur.likes }}</span>
              <i class="fas fa-clock"></i> {{ murmur.likes }}
            </div>
            <div class="col">
              <div class="div" v-if="$auth.loggedIn">
                <button class="btn btn-success btn-sm" v-if="murmur.user_id != $auth.user.id" @click="likeMurmur(murmur.id)">Like</button>
                <!-- <nuxt-link :to="`/murmurs/${murmur.id}/edit`" v-if="murmur.user_id == $auth.user.id">
                  <button class="btn btn-primary btn-sm">Edit</button>
                </nuxt-link> -->
                <button class="btn btn-danger btn-sm" v-if="murmur.user_id == $auth.user.id" @click="deleteMurmur(murmur.id)">Delete</button>
              </div>
              <div class="div" v-else>
                <nuxt-link :to="`/login`">
                  <button class="btn btn-success btn-sm">Like</button>
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
    async setMessage(alertType, text) {
      this.message.alertType = alertType
      this.message.text = text
    }
  },
}
</script>