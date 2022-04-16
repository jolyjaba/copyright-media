<template>
  <div>
    <BaseHeader />
    <main>
      <VContainer>
        <VList :list="posts" class="list--posts">
          <template #default="{ item }">
            <VLink :to="`/post/${item.id}`">
              <BasePost :item="item" />
            </VLink>
          </template>
        </VList>
        <BasePagination />
      </VContainer>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IPost from '@/types/IPost'
import VLink from '@/components/VLink.vue'
import VList from '@/components/VList.vue'
import BasePost from '@/components/BasePost.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BasePagination from '@/components/BasePagination.vue'
import VContainer from '@/components/VContainer.vue'

export default Vue.extend({
  name: 'PostsPage',
  components: {
    BaseHeader,
    BasePost,
    BasePagination,
    VLink,
    VList,
    VContainer,
  },
  async fetch(ctx): Promise<void> {
    const page = ctx.route.params.page
    const searchText: string = ctx.store.getters['posts/getSearchText']
    if (!page) {
      ctx.redirect({ path: '/1' })
    } else {
      await ctx.store.dispatch('posts/fetchPosts', { page, searchText })
    }
  },
  computed: {
    posts(): IPost[] {
      return this.$store.getters['posts/getPosts']
    },
  },
})
</script>

<style lang="scss" scoped>
.list--posts {
  ::v-deep li {
    &:not(:last-of-type) {
      border-bottom: 1px solid #d1d1d6;
    }
    @include medium {
      border: 1px solid $border-color;
      border-radius: 20px;
    }
  }
  @include medium {
    display: grid;
    padding: 0;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 23px;
  }
}
</style>
