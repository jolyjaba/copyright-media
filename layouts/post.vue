<template>
  <div>
    <PostHeader />
    <Nuxt />
    <BaseFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseFooter from '@/components/atoms/BaseFooter.vue'
import PostHeader from '@/components/atoms/PostHeader.vue'

export default Vue.extend({
  name: 'PostLayout',
  components: { BaseFooter, PostHeader },
})
</script>
