<template>
  <div class="search">
    <VSvg class="search__icon" icon-id="search-icon"/>
    <input
      :value="value"
      class="search__input"
      placeholder="Поиск"
      type="search"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VSvg from '@/components/VSvg.vue'

export default Vue.extend({
  components: { VSvg },
  props: {
    value: {
      type: String,
      required: true,
      default: '',
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
  padding: 7px 16px 7px 8px;
  border-radius: 10px;
  margin: 10px 0;
  @include medium {
    padding: 14px 16px 14px 8px;
    min-width: 285px;
  }
  &__icon {
    width: 20px;
    height: 22px;
  }
  &__input {
    border: none;
    width: 100%;
    padding: 0;
    background: transparent;
    @include useFont(
      $family: sans-serif,
      $weight: 400,
      $size: 17px,
      $line-height: 22px
    );
    outline: none;
    &,
    &::placeholder {
      color: $text-body-color;
    }
  }
}
</style>
