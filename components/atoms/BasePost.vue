<template>
  <article class="item">
    <h2 class="item__title">{{ item.title }}</h2>
    <p class="item__body">{{ item.body }}</p>
    <div class="item__details">
      <svg class="icon">
        <use xlink:href="@/assets/icons/main.svg#comment-icon" />
      </svg>
      <p class="post__count">{{ item.comments.length }}</p>
      <svg class="icon post__edit">
        <use xlink:href="@/assets/icons/main.svg#pen-icon" />
      </svg>
    </div>
    <img
      class="item__image"
      src="@/assets/images/Article_preview_1.png"
      alt="picture"
    />
    <img
      class="item__image-medium"
      src="@/assets/images/Article_preview_2.png"
      alt="picture"
    />
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import IPost from '@/types/IPost'

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<IPost>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';
.item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  @include medium {
    grid-template-rows: repeat(4, auto);
  }
  &__title {
    font-family: Manrope;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
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
    color: rgba(60, 60, 67, 0.6);
    font-family: Manrope;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
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
      display: none;
    }
    &-medium {
      display: none;
      @include medium {
        display: block;
        width: 100%;
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
      }
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
    .post__count {
      font-family: Manrope;
      letter-spacing: 0.5px;
      color: rgba(60, 60, 67, 0.6);
      font-weight: 400;
      font-size: 17px;
      line-height: 24px;
      text-align: center;
    }
    .post__edit {
      margin-left: 22px;
    }
  }
}
.icon {
  width: 24px;
  height: 24px;
}
</style>
