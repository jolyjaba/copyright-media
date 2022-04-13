<template>
  <header class="header">
    <h1 class="header__heading">Посты</h1>
    <BaseSearch v-model="search" @input="onInput" />
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
.header {
  padding: 96px 16px 8px;
  display: grid;
  background: #fafafa;
  &__heading {
    margin: 8px 0;
    font-family: Manrope;
    font-size: 32px;
    line-height: 36px;
    font-weight: 700;
  }
}
</style>
