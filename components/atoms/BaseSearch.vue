<template>
  <div class="search">
    <svg class="search__icon">
      <use xlink:href="@/assets/icons/main.svg#search-icon" />
    </svg>
    <input
      :value="value"
      class="search__input"
      placeholder="Поиск"
      type="search"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
      default: () => '',
    },
  },
  methods: {
    onInput(event: any) {
      this.$emit('input', event.target.value)
    },
  },
})
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(60, 60, 67, 0.1);
  padding: 7px 8px;
  border-radius: 10px;
  margin: 10px 0;
  &__icon {
    width: 20px;
    height: 22px;
  }
  &__input {
    border: none;
    width: 100%;
    padding: 0;
    background: transparent;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    outline: none;
    &,
    &::placeholder {
      color: rgba(60, 60, 67, 0.6);
    }
  }
}
</style>
