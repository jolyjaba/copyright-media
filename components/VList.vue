<template>
  <ul class="list">
    <li v-for="item in list" :key="item[keyId]">
      <slot :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    keyId: {
      type: [String, Number],
      required: false,
      default: 'id',
    },
  },
})
</script>

<style lang="scss" scoped>
.list {
  padding: 0 16px;
}
</style>
