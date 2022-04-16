<template>
  <article class="item">
    <h2 class="item__title">{{ item.title }}</h2>
    <p class="item__body">{{ item.body }}</p>
    <div class="item__details">
      <VSvg icon-id="comment-icon" />
      <p class="item__post-count">{{ item.comments.length }}</p>
      <VSvg class="item__post-edit" icon-id="pen-icon" />
    </div>
    <VImage
      class="item__image"
      :src="require('@/assets/images/Article_preview_1.png')"
    />
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import IPost from '@/types/IPost'
import VSvg from '@/components/VSvg.vue'
import VImage from '@/components/VImage.vue'

export default Vue.extend({
  components: { VSvg, VImage },
  props: {
    item: {
      type: Object as PropType<IPost>,
      required: true,
      default: () => ({} as IPost),
    },
  },
})
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  padding: 16px 0;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  @include medium {
    padding: 0;
    grid-template-rows: repeat(4, auto);
  }
  &__title {
    @include useFont($weight: 700, $size: 24px, $line-height: 28px);
    grid-row-start: 1;
    grid-row-end: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 56px;
    margin-top: 16px;
    @include medium {
      padding: 0 16px;
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 2;
      grid-row-end: 3;
      min-height: 56px;
    }
  }
  &__body {
    @include useFont($weight: 400, $size: 17px, $line-height: 22px);
    color: $text-body-color;
    grid-row-start: 2;
    grid-row-end: 3;
    margin-top: 8px;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 66px;
    @include medium {
      padding: 0 16px;
      max-height: 44px;
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 3;
      grid-row-end: 4;
    }
  }
  &__image {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 4;
    width: calc(100% + 16px);
    @include medium {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
  }
  &__details {
    display: grid;
    padding: 4px 0;
    grid-template-columns: auto auto 1fr;
    gap: 10px;
    align-items: center;
    margin-bottom: 8px;
    @include medium {
      grid-row-start: 4;
      grid-row-end: 5;
      padding-left: 16px;
    }
  }
  &__post {
    &-count {
      @include useFont($weight: 400, $size: 17px, $line-height: 24px);
      letter-spacing: 0.5px;
      color: $text-body-color;
      text-align: center;
    }
    &-edit {
      margin-left: 22px;
    }
  }
}
</style>
