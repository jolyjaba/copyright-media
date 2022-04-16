<template>
  <NuxtLink
    v-slot="{ navigate, href, isActive, isExactActive }"
    custom
    :to="to"
  >
    <component
      :is="tag"
      :href="href"
      :class="['link', { active: isActive, 'exact-active': isExactActive }]"
      @click="navigate"
    >
      <slot v-bind="{ isActive, isExactActive }" />
    </component>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    to: {
      type: String,
      required: true,
      default: '',
    },
    tag: {
      type: String,
      required: false,
      default: 'a',
    },
  },
})
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: unset;
}
</style>
