<template>
  <header class="header">
    <h1 class="header__logo">Logo</h1>
    <h1 class="header__heading">Посты</h1>
    <BaseSearch v-model="search" @input="onInput" />
    <NuxtLink to="/">
      <span class="header__posts">
        <svg>
          <use xlink:href="@/assets/icons/main.svg#posts-icon" />
        </svg>
        <p>Посты</p>
      </span>
    </NuxtLink>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import debounce from 'lodash/debounce'
import BaseSearch from '@/components/atoms/BaseSearch.vue'

export default Vue.extend({
  components: { BaseSearch },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    onInput: debounce(async function (event) {
      // @ts-ignore
      const { $store, $route, $router } = this
      $store.commit('posts/SET_SEARCH_TEXT', event)
      if (+$route.params.page !== 1) {
        $router.replace({ path: '/1' })
      } else {
        await $store.dispatch('posts/fetchPosts', {
          page: $route.params.page,
          searchText: event,
        })
      }
    }, 300),
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';
.header {
  padding: 96px 16px 8px;
  display: grid;
  background: #fafafa;
  @include medium {
    background: #fff;
    padding: 24px 0 46px;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    margin: 0 auto;
    max-width: $max-width-container;
  }
  a {
    text-decoration: none;
    color: transparent;
  }
  &__heading {
    margin: 8px 0;
    font-family: Manrope;
    font-size: 32px;
    line-height: 36px;
    font-weight: 700;
    @include medium {
      display: none;
    }
  }
  &__logo {
    display: none;
    font-family: 'Inter';
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    @include medium {
      display: block;
    }
  }
  &__posts {
    display: none;
    margin-left: 90px;
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
      font-family: 'Manrope';
      font-weight: 500;
      font-size: 14px;
      line-height: 12px;
      text-align: center;
      letter-spacing: 0.5px;
      color: #ff008a;
    }
  }
}
</style>
