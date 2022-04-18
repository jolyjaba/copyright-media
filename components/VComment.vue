<template>
  <article class="comment">
    <span class="comment__avatar">
      <VImage :src="require('@/assets/images/👨.png')" />
    </span>
    <h3 class="comment__user-name">{{ item.name }}</h3>
    <p class="comment__post">{{ item.body }}</p>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import IComment from '@/types/IComment'
import VImage from '@/components/VImage.vue'

export default Vue.extend({
  components: { VImage },
  props: {
    item: {
      type: Object as PropType<IComment>,
      required: true,
      default: () => ({} as IComment),
    },
  },
})
</script>

<style lang="scss" scoped>
.comment {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, auto);
  gap: 1px 12px;
  padding: 8px 0;
  @include medium {
    gap: 10px 12px;
    padding: 8px 0;
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
    @include useFont($weight: 600, $size: 18px, $line-height: 24px);
    letter-spacing: 0.5px;
  }
  &__post {
    @include useFont($weight: 400, $size: 17px, $line-height: 22px);
    color: $text-body-color;
    @include medium {
      font-size: 17px;
    }
  }
}
</style>
