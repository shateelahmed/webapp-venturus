<template>
  <div>
    <div class="header">
      <h1>Users</h1>
    </div>
    <div v-for="user in users" :key="user.id">
      <div class="card">
        <div class="card-body">
          <nuxt-link :to="`/users/${user.id}`">{{ user.name }}</nuxt-link>
        </div>
        <hr>
        <div class="card-footer">
          <div class="card-footer-info">
            <span>
              Murmurs 
              <nuxt-link :to="`/users/${user.id}/murmurs`">
                {{ user.murmurs }}
              </nuxt-link>
            </span>
            |<span>Followers: {{ user.followers }}</span>
            |<span>Follows: {{ user.follows }}</span>
          </div>
          <div class="card-footer-actions">
            <nuxt-link :to="`/users/${user.id}/follow`">
              <button class="like-button">Follow</button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- <nuxt-link :to="`/users/${user.id}`">{{ user.name }}</nuxt-link> -->
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