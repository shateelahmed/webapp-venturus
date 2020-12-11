<template>
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
          <i class="fas fa-clock"></i> <span>{{ murmur.updated_at_f }}</span>
          <nuxt-link :to="`/murmurs/${murmur.id}`">
            <button class="btn btn-info btn-sm">View</button>
          </nuxt-link>
        </div>
        <div class="col">
          <div class="div" v-if="$auth.loggedIn">
            <button class="btn btn-success btn-sm" v-if="murmur.user_id != $auth.user.id" @click="likeMurmur(murmur.id)">Like</button>
            <button class="btn btn-warning btn-sm" v-if="murmur.user_id != $auth.user.id" @click="unlikeMurmur(murmur.id)">Unlike</button>
            <!-- <nuxt-link :to="`/murmurs/${murmur.id}/edit`" v-if="murmur.user_id == $auth.user.id">
              <button class="btn btn-primary btn-sm">Edit</button>
            </nuxt-link> -->
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
</template>

<script>
export default {
  name: "Murmur",
  data() {
    return {
    }
  },
  props: ["murmur", "likeMurmur", "unlikeMurmur", "deleteMurmur"],
  // async asyncData({ $axios }) {
  //   const liked = await $axios.$get(`/murmurs/${this.murmur.id}/liked`)
  //   console.log(liked);

  //   return {
  //     liked
  //   }
  // },
}
</script>