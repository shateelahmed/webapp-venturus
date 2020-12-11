<template>
  <div class="card mt-3">
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
</template>

<script lang="ts">
export default {
  name: "User",
  data() {
    return {
    }
  },
  props: ["user", "followUser", "unfollowUser"],
}
</script>