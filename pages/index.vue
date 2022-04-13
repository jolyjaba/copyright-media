<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import IPost from '~/types/IPost'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData(ctx) {
    await ctx.store.dispatch('fetchPosts', { page: 1, limit: 9 })
  },
  computed: {
    posts(): IPost[] {
      return this.$store.getters.getPosts
    }
  }
})
</script>
