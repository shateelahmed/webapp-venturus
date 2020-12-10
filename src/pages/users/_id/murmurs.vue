<template>
  <div>
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

<script lang="ts">
export default {
  props: ['user'],
  head: {
    title: 'murmurs of user',
  },
  data() {
    return {}
  },
  async asyncData(context: any): Promise<object> {
    const murmurs = await context.$axios.$get(`/users/${context.params.id}/murmurs`)
    // console.log(murmurs);

    return {
      murmurs: murmurs,

    }
  },
}
</script>

<style>
</style>