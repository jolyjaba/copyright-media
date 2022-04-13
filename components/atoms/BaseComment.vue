<template>
  <article class="comment">
    <span class="comment__avatar">
      <img src="@/assets/images/👨.png" alt="👨" />
    </span>
    <h3 class="comment__user-name">{{ item.name }}</h3>
    <p class="comment__post">{{ item.body }}</p>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import IComment from '@/types/IComment'

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<IComment>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';
.comment {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, auto);
  gap: 1px 12px;
  padding: 8px 0;
  @include medium {
    gap: 10px 12px;
    padding: 8px 16px;
  }
  &__avatar {
    grid-row-start: 1;
    grid-row-end: 3;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: black;
    img {
      width: 24px;
    }
  }
  &__user-name {
    font-family: 'Manrope';
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }
  &__post {
    font-family: 'Manrope';
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    color: rgba(60, 60, 67, 0.6);
    @include medium {
      font-size: 17px;
    }
  }
}
</style>
