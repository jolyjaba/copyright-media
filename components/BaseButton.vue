<template>
  <button :type="type" :class="['button', buttonStyle]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'button',
    },
    buttonStyle: {
      type: String,
      default: 'primary',
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  border: none;
  padding: 14px 0;
  border-radius: 5px;
  @include useFont($weight: 300, $size: 18px, $line-height: 22px);
  width: 100%;
  &.primary {
    background: $red-color;
    color: #ffffff;
  }
  &.ghost {
    background: #ffffff;
    border: 1px solid #ff008a;
    color: $red-color;
  }
}
</style>
