<template>
  <div>
    <h1>Register</h1>
    <!-- <UserAuthForm buttonText="Register" :registerUser="loginUser" /> -->
    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="registerUser">
          <div v-if="this.message.text" :class="'alert alert-dismissible fade show alert-'+this.message.alertType" role="alert">
            {{ this.message.text }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
            <input type="text" v-model="form.name" class="form-control" id="name">
            <div v-if="submitted && errors.name.length" class="text-danger">{{ errors.name }}</div>
            <div v-else id="nameHelp" class="form-text">Enter you full name.</div>
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
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name: '',
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
    async registerUser() {
      this.submitted = true
      this.errors.name = ''
      this.errors.email = ''
      this.errors.password = ''
      this.message.alertType = ''
      this.message.text = ''
      
      if (this.isEmpty(this.form.name)) {
        this.errors.name += 'Your full name is required. '
      }
      if (this.isEmpty(this.form.email)) {
        this.errors.email += 'Email is required. '
      }
      if (!this.isValidEmail(this.form.email)) {
        this.errors.email += 'Email is invalid. '
      }
      if (this.isEmpty(this.form.password)) {
        this.errors.password += 'Password is required. '
      }
      if (!this.minLengthIsValid(this.form.password, 3)) {
        this.errors.password += 'Password length must be at least 6 characters. '
      }
      // console.log(this.errors)

      if (this.isEmpty(this.errors.name) && this.isEmpty(this.errors.email) && this.isEmpty(this.errors.password)) {
        console.log('Form submitted');
        await this.$axios.$post('/users/register', this.form)
          .then((res) => {
            this.form.name = ''
            this.form.email = ''
            this.form.password = ''
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

        // console.log('done')
        // console.log(res)
        // this.form.name = ''
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
    isValidEmail(email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    minLengthIsValid(field, minLength) {
      return [...field].length >= minLength;
    }
  }
}
</script>