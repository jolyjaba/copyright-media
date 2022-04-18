<template>
  <img class="image" :src="src" :alt="src" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  display: block;
}
</style>
