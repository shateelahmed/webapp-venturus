<template>
  <div>
    <div v-if="this.message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+this.message.alertType" role="alert">
      {{ this.message.text }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="header">
      <h1>Timeline</h1>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Post murmur
      </div>
      <div class="card-body">
        <form @submit.prevent="postMurmur">
          <div class="mb-3">
            <textarea class="form-control" v-model="form.description" id="description" rows="3" placeholder="Write something here..."></textarea>
            <div v-if="submitted && errors.description.length" class="text-danger">{{ errors.description }}</div>
          </div>
          <button type="submit" class="btn btn-primary" v-if="$auth.loggedIn">Post</button>
          <nuxt-link :to="`/login`" v-else><button class="btn btn-success btn-sm">Post</button></nuxt-link>
        </form>
      </div>
    </div>
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
                <nuxt-link :to="`/murmurs/${murmur.id}/edit`" v-if="murmur.user_id == $auth.user.id">
                  <button class="btn btn-primary btn-sm">Edit</button>
                </nuxt-link>
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
  head: {
    title: 'murmurs',
  },
  data() {
    return {
      form: {
        description: '',
      },
      errors: {
        description: '',
      },
      submitted: false,
      message: {
        alertType: '',
        text: '',
      },
    }
  },
  // async asyncData({ $axios }: { $axios:any }): Promise<object> {
  async asyncData({ $axios }) {
    const murmurs = await $axios.$get('/murmurs')
    // console.log(murmurs);

    return {
      murmurs
    }
  },
  methods: {
    isEmpty(field) {
      if (field === '') {
        return true
      }
      return false
    },
    async postMurmur() {
      this.submitted = true
      this.errors.description = ''
      this.message.alertType = ''
      this.message.text = ''
  
      if (await this.isEmpty(this.form.description)) {
        this.errors.description += 'Please write something to post murmur.'
        return
      }

      console.log('Form submitted');
      await this.$axios.$post('/murmurs/save', this.form)
          .then((res) => {
            this.form.description = ''
            this.submitted = false
            this.message.alertType = 'success'
            this.message.text = res
          })
          .catch((err) => {
            this.form.password = ''
            // this.successMessage = err.response.data
            this.message.alertType = 'danger'
            this.message.text = err.response.data
          })
    },
    async likeMurmur(murmur_id) {
      await this.$axios.$post(`/murmurs/${murmur_id}/like`)
        .then((res) => {
          this.message.alertType = 'success'
          this.message.text = res
        })
        .catch((err) => {
          this.message.alertType = 'danger'
          this.message.text = err.response.data
        })
    },
    async unlikeMurmur(murmur_id) {
      await this.$axios.$post(`/murmurs/${murmur_id}/unlike`)
        .then((res) => {
          this.message.alertType = 'success'
          this.message.text = res
        })
        .catch((err) => {
          this.message.alertType = 'danger'
          this.message.text = err.response.data
        })
    },
    async deleteMurmur(murmur_id) {
      if (confirm("Are you sure you want to delete this murmur?")) {
        await this.$axios.$post(`/murmurs/${murmur_id}/delete`)
          .then((res) => {
            this.message.alertType = 'success'
            this.message.text = res
          })
          .catch((err) => {
            this.message.alertType = 'danger'
            this.message.text = err.response.data
          })
      }
    }
  },
}
</script>

<style>
</style>