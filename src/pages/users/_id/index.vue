<template>
  <div>
    <h1>Details of {{ user.name }}</h1>
    <div class="card">
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
        <!-- <div class="card-footer-info">
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
        </div> -->
    <!-- <nuxt-link :to="`/users/${user.id}/edit`">
      <button>Edit</button>
    </nuxt-link> -->
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
                by: 
                <nuxt-link class="btn btn-link btn-sm" :to="`/users/${murmur.user_id}`">
                  {{ murmur.user_name }}
                </nuxt-link>
              </span>
              likes: <span class="badge bg-success">{{ murmur.likes }}</span>
            </div>
            <div class="col float-right">
              <nuxt-link :to="`/murmurs/${murmur.id}/like`">
                <button class="btn btn-success btn-sm">Like</button>
              </nuxt-link>
              <nuxt-link :to="`/murmurs/${murmur.id}/edit`">
                <button class="btn btn-primary btn-sm">Edit</button>
              </nuxt-link>
              <nuxt-link :to="`/murmurs/${murmur.id}/delete`">
                <button class="btn btn-danger btn-sm">Delete</button>
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