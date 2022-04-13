<template>
  <div>
    <PostHeader class="mobile-only" />
    <BaseHeader class="medium-only" />
    <Nuxt />
    <BaseFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseFooter from '@/components/atoms/BaseFooter.vue'
import PostHeader from '@/components/atoms/PostHeader.vue'
import BaseHeader from '@/components/organisms/BaseHeader.vue'

export default Vue.extend({
  name: 'PostLayout',
  components: { BaseFooter, PostHeader, BaseHeader },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';

.mobile-only {
  @include medium {
    display: none;
  }
}

.medium-only {
  display: none;
  @include medium {
    display: grid;
  }
}
</style>
