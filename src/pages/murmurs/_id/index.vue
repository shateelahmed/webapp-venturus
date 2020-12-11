<template>
  <div>
    <div v-if="this.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+this.message.alertType" role="alert">
      {{ this.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <h1>Murmur</h1>
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
            <i class="fas fa-clock"></i> <span>{{ murmur.updated_at_f }}</span>
          </div>
          <div class="col">
            <div class="div" v-if="$auth.loggedIn">
              <button class="btn btn-success btn-sm" v-if="murmur.user_id != $auth.user.id" @click="likeMurmur(murmur.id)">Like</button>
              <button class="btn btn-warning btn-sm" v-if="murmur.user_id != $auth.user.id" @click="unlikeMurmur(murmur.id)">Unlike</button>
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
</template>

<script>
export default {
  props: ['murmur'],
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
            this.$router.push('/me/murmurs')
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