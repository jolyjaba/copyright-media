<template>
  <svg class="icon">
    <use :xlink:href="require(`@/assets/icons/main.svg`) + `#${iconId}`" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    iconId: {
      type: String,
      required: true,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
