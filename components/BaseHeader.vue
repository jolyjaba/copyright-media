<template>
  <VContainer>
    <header class="header">
      <h1 class="header__logo">Logo</h1>
      <h1 class="header__heading">Посты</h1>
      <BaseSearch v-model="search" @input="debounceSearch" />
      <VLink class="header__posts" to="/">
        <span class="header__button">
          <VSvg icon-id="posts-icon" />
          <p>Посты</p>
        </span>
      </VLink>
    </header>
  </VContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import VSvg from '@/components/VSvg.vue'
import VLink from '@/components/VLink.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import VContainer from '@/components/VContainer.vue'

export default Vue.extend({
  components: { BaseSearch, VSvg, VLink, VContainer },
  data() {
    return {
      search: '',
      debounceTimeout: 0,
    }
  },
  methods: {
    async searchText(): Promise<void> {
      const { $store, $route, $router, search } = this
      $store.commit('posts/SET_SEARCH_TEXT', search)
      if (+$route.params.page !== 1) {
        $router.replace({ path: '/1' })
      } else {
        await $store.dispatch('posts/fetchPosts', {
          page: $route.params.page,
          searchText: search,
        })
      }
    },
    debounceSearch(): void {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
      this.debounceTimeout = window.setTimeout(() => this.searchText(), 300)
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  padding: 96px 16px 8px;
  display: grid;
  background: #fafafa;
  @include medium {
    background: #fff;
    padding: 24px 0 46px;
    grid-template-columns: 1fr auto auto;
    align-items: center;
  }
  &__heading {
    margin: 8px 0;
    @include useFont($size: 32px, $line-height: 36px, $weight: 700);
    @include medium {
      display: none;
    }
  }
  &__logo {
    display: none;
    @include useFont(
      $family: 'Inter',
      $size: 20px,
      $line-height: 24px,
      $weight: 700
    );
    @include medium {
      display: block;
    }
  }
  &__posts {
    margin-left: 90px;
  }
  &__button {
    display: none;
    @include medium {
      display: flex;
    }
    align-items: center;
    gap: 7px;
    svg {
      width: 24px;
      height: 24px;
    }
    p {
      @include useFont($size: 14px, $line-height: 12px, $weight: 500);
      text-align: center;
      letter-spacing: 0.5px;
      color: $red-color;
    }
  }
}
</style>
