<template>
  <footer class="footer">
    <VContainer>
      <p>2021 copyright all rights reserved</p>
    </VContainer>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import VContainer from '@/components/VContainer.vue'

export default Vue.extend({
  components: { VContainer },
})
</script>

<style lang="scss" scoped>
.footer {
  p {
    @include useFont(
      $family: 'Inter',
      $weight: 400,
      $size: 16px,
      $line-height: 19px
    );
    color: #000000;
  }
  padding: 30px 16px 39px;
  border-top: 1px solid #e8e8e8;
}
</style>
