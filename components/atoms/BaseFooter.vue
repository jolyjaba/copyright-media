<template>
  <footer class="footer">
    <p>2021 copyright all rights reserved</p>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';

.footer {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  padding: 30px 16px 39px;
  border-top: 1px solid #e8e8e8;
  @include medium {
    p {
      max-width: $max-width-container;
      margin: 0 auto;
    }
  }
}
</style>
