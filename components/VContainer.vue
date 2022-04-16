<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.container {
  @include medium {
    max-width: $max-width-container;
    margin: 0 auto;
  }
}
</style>
