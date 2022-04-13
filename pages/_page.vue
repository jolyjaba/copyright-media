<template>
  <MainPage />
</template>

<script lang="ts">
import Vue from 'vue'
import MainPage from '@/components/templates/MainPage.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { MainPage },
  async fetch(ctx) {
    const page = ctx.route.params.page
    const searchText = ctx.store.getters['posts/getSearchText']
    if (!page) {
      ctx.redirect({ path: '/1' })
    } else {
      await ctx.store.dispatch('posts/fetchPosts', { page, searchText })
    }
  },
})
</script>
