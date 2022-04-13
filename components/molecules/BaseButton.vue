<template>
  <button :type="type" :class="['button', buttonStyle]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type buttonTypes = 'button' | 'submit' | 'reset' | undefined

export default Vue.extend({
  props: {
    type: {
      type: String as PropType<buttonTypes>,
      default: () => 'button',
    },
    buttonStyle: {
      type: String,
      default: () => 'primary',
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  border: none;
  padding: 14px 0;
  border-radius: 5px;
  font-family: 'Manrope';
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  width: 100%;
  &.primary {
    background: #ff008a;
    color: #ffffff;
  }
  &.ghost {
    background: #ffffff;
    border: 1px solid #ff008a;
    color: #ff008a;
  }
}
</style>
