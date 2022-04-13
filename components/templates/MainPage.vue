<template>
  <main>
    <ul class="list">
      <li v-for="item in posts" :key="item.id" class="list__item-wrapper">
        <NuxtLink class="link" :to="`/post/${item.id}`">
          <BasePost :item="item" />
        </NuxtLink>
      </li>
    </ul>
    <BasePagination />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import IPost from '@/types/IPost'
import BasePost from '@/components/atoms/BasePost.vue'
import BasePagination from '@/components/atoms/BasePagination.vue'

export default Vue.extend({
  components: { BasePost, BasePagination },
  computed: {
    posts(): IPost[] {
      return this.$store.getters['posts/getPosts']
    },
  },
})
</script>

<style lang="scss" scoped>
.list {
  padding: 0 16px;
  &__item-wrapper {
    padding: 16px 0;
    &:not(:last-of-type) {
      border-bottom: 1px solid #d1d1d6;
    }
  }
}
.link {
  text-decoration: none;
  color: unset;
}
</style>
