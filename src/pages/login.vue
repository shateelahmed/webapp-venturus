<template>
  <div>
    <h1>Login</h1>
    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="loginUser">
          <div v-if="this.message.text" :class="'alert alert-dismissible fade show alert-'+this.message.alertType" role="alert">
            {{ this.message.text }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address <span class="text-danger">*</span></label>
            <input type="text" v-model="form.email" class="form-control" id="email">
            <div v-if="submitted && errors.email.length" class="text-danger">{{ errors.email }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
            <input type="password" v-model="form.password" class="form-control" id="password">
            <div v-if="submitted && errors.password.length" class="text-danger">{{ errors.password }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        email: 'shateel@mail.com',
        password: '321',
      },
      errors: {
        email: '',
        password: '',
      },
      submitted: false,
      message: {
        alertType: '',
        text: '',
      },
    }
  },
  methods: {
    async loginUser() {
      this.submitted = true
      this.errors.email = ''
      this.errors.password = ''
      this.message.alertType = ''
      this.message.text = ''

      if (this.isEmpty(this.form.email)) {
        this.errors.email += 'Email is required. '
      }
      if (this.isEmpty(this.form.password)) {
        this.errors.password += 'Password is required. '
      }
      // console.log(this.errors)

      if (this.isEmpty(this.errors.email) && this.isEmpty(this.errors.password)) {
        console.log('Form submitted');
        // try {
        //   let response = await this.$auth.loginWith('local', { data: this.form })
        //   console.log(response)
        // } catch (err) {
        //   console.log(err)
        // }
        // const config = {
        //     headers: {
        //       'content-type': 'application/json',
        //       'accept': 'application/json',
        //     }
        // }
        // await this.$axios.$post('/users/login', this.form, config)
        await this.$axios.$post('/users/login', this.form)
          .then((res) => {
            this.form.email = ''
            this.form.password = ''
            this.submitted = false
            this.message.alertType = 'success'
            this.message.text = 'Login successful'
            // console.log('loggin', res.data)
            console.log(res)
            this.$auth.setUser(user)
          })
          .catch((err) => {
            this.form.password = ''
            // this.successMessage = err.response.data
            this.message.alertType = 'danger'
            this.message.text = err.response.data
          })

        // console.log('done')
        // console.log(res)
        // this.form.email = ''
        // this.form.password = ''
        // this.submitted = false
        // this.successMessage = res
      } else {
        console.log('Form is invalid')
        console.log(this.errors)
      }
    },
    isEmpty(field) {
      if (field === '') {
        return true
      }
      return false
    },
  }
}
</script>