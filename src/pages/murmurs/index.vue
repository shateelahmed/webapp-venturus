<template>
  <div>
    <div class="header">
      <h1>Murmurs</h1>
    </div>
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
          <!-- <div class="card-footer-info">
          </div>
          <div class="card-footer-actions">
          </div> -->
        </div>
      </div>
      <!-- <nuxt-link :to="`/murmurs/${murmur.id}`">{{ murmur.id }}</nuxt-link> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  head: {
    title: 'murmurs',
  },
  data() {
    return {}
  },
  async asyncData({ $axios }: { $axios:any }): Promise<object> {
    const murmurs = await $axios.$get('/murmurs')
    // console.log(murmurs);

    return {
      murmurs
    }
  },
}
</script>

<style>
</style>