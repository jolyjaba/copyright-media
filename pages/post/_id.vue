<template>
  <main>
    <PostView />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import PostView from '@/components/templates/PostView.vue'

export default Vue.extend({
  components: { PostView },
  layout: 'post',
  async asyncData(ctx) {
    const id = ctx.route.params.id
    await ctx.store.dispatch('posts/fetchPost', id)
    await ctx.store.dispatch('comments/fetchComments', id)
  },
})
</script>
