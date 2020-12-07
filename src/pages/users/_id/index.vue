<template>
  <div>
    <div class="header">
      <h1>Details of {{ user.name }}</h1>
    </div>
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
    <!-- <nuxt-link :to="`/users/${user.id}/edit`">
      <button>Edit</button>
    </nuxt-link> -->
    <div class="header">
      <h1>Murmurs of {{ user.name }}</h1>
    </div>
    <div v-for="murmur in murmurs" :key="murmur.id">
      <div class="card">
        <div class="card-body">
          {{ murmur.description }}
        </div>
        <hr>
        <div class="card-footer">
          <div class="card-footer-info">
            <span class="author">
              by: 
              <nuxt-link :to="`/users/${murmur.user_id}`">
                {{ murmur.user_name }}
              </nuxt-link>
            </span>
            <span>likes {{ murmur.likes }}</span>
          </div>
          <div class="card-footer-actions">
            <nuxt-link :to="`/murmurs/${murmur.id}/like`">
              <button class="like-button">Like</button>
            </nuxt-link>
            <nuxt-link :to="`/murmurs/${murmur.id}/edit`">
              <button class="edit-button">Edit</button>
            </nuxt-link>
            <nuxt-link :to="`/murmurs/${murmur.id}/delete`">
              <button class="delete-button">Delete</button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- <nuxt-link :to="`/murmurs/${murmur.id}`">{{ murmur.id }}</nuxt-link> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['user'],
  head: {
    title: `Show`
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