<template>
  <header class="header">
    <svg class="header__back-icon" @click="$router.back()">
      <use xlink:href="@/assets/icons/main.svg#back-icon" />
    </svg>
    <h2 class="header__title">Пост</h2>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  padding: 54px 16px 10px;
  background: #fafafa;
  grid-template-columns: 1fr 2fr 1fr;
  &__back-icon {
    width: 75px;
    height: 24px;
  }
  &__title {
    font-family: 'Manrope';
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }
}
</style>
