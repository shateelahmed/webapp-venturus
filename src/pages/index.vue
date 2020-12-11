<template>
  <div>
    <div v-if="message.text" :class="'alert alert-fixed alert-dismissible fade show alert-'+message.alertType" role="alert">
      {{ message.text }}
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
    <Murmurs
      :murmurs="murmurs"
      :likeMurmur="likeMurmur"
      :unlikeMurmur="unlikeMurmur"
      :deleteMurmur="deleteMurmur"
    />
  </div>
</template>

<script>
import Murmurs from '../components/Murmurs';

export default {
  components: {
    Murmurs
  },
  head: {
    title: 'Timeline',
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
      murmurs: [],
      message: {
        alertType: '',
        text: '',
      },
    }
  },
  // async asyncData({ $axios }: { $axios:any }): Promise<object> {
  async asyncData({ $axios }) {
    // const murmurs = await $axios.$get('/murmurs')
    const murmurs = await $axios.$get('/timeline')
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
      this.setMessage('', '')
  
      if (await this.isEmpty(this.form.description)) {
        this.errors.description += 'Please write something to post murmur.'
        return
      }

      console.log('Form submitted');
      await this.$axios.$post('/murmurs/save', this.form)
        .then(async (res) => {
          this.form.description = ''
          this.submitted = false
          this.setMessage('success', res)
          this.murmurs = await this.$axios.$get('/murmurs')
        })
        .catch((err) => {
          this.setMessage('danger', err.response.data)
        })
    },
    async likeMurmur(murmur_id) {
      await this.$axios.$post(`/murmurs/${murmur_id}/like`)
        .then(async (res) => {
          this.setMessage('success', res)
          this.murmurs = await this.$axios.$get('/murmurs')
        })
        .catch((err) => {
          this.setMessage('danger', err.response.data)
        })
    },
    async unlikeMurmur(murmur_id) {
      await this.$axios.$post(`/murmurs/${murmur_id}/unlike`)
        .then(async (res) => {
          this.setMessage('success', res)
          this.murmurs = await this.$axios.$get('/murmurs')
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

<style>
</style>