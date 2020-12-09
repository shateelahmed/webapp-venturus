<template>
  <div>
    some form
  </div>
  <!-- <v-form v-model="valid">
    <v-text-field v-model="userInfo.name" 
                  label="Name" 
                  color="green"
                  :rules="[required('name')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.email" 
                  label="Email"
                  color="green" 
                  :rules="[required('email'), emailFormat()]"/>

    <UserAuthPassword v-model="userInfo.password" label="Password" />
    <v-btn @click="submitForm(userInfo)" :disabled="!valid" color="green accent-3">{{ buttonText }}</v-btn>
  </v-form> -->
</template>

<script>
  import validations from "@/utils/validations";
  import UserAuthPassword from '@/components/UserAuthPassword.vue';
  export default {
    data() {
      return {
        valid: false,
        userInfo: {
          name: '',
          email: '',
          password: '',
        },
        ...validations
      }
    },
    components: {
      UserAuthPassword
    },
    props: {
      submitForm: {
        type: Function,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      hasName: Boolean,
    }
  }
</script>