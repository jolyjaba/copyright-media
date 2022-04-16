<template>
  <div>
    <Nuxt />
    <BaseFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseFooter from '@/components/BaseFooter.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: { BaseFooter },
})
</script>
