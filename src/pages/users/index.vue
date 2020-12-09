<template>
  <div>
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
            <div class="col float-right">
              <nuxt-link :to="`/users/${user.id}/follow`">
                <button class="btn btn-success btn-sm">Follow</button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  head: {
    title: 'Users',
  },
  data() {
    return {}
  },
  async asyncData({ $axios }: { $axios:any }): Promise<object> {
    const users = await $axios.$get('/users')
    // console.log(users);

    return {
      users
    }
  },
}
</script>