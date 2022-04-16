<template>
  <section v-if="totalCount" class="pagination">
    <ul class="pagination__items">
      <template v-if="currentPage > 1">
        <VLink :to="`/${currentPage - 1}`">
          <template #default="{ isExactActive }">
            <li
              :class="[
                'pagination__item',
                { 'pagination__item--is-active': isExactActive },
              ]"
            >
              <VSvg icon-id="prev-icon" />
            </li>
          </template>
        </VLink>
      </template>
      <template v-else>
        <a>
          <li class="pagination__item">
            <VSvg icon-id="prev-icon" />
          </li>
        </a>
      </template>
      <VLink
        v-for="item in pagination"
        :key="item.page"
        :to="`/${item.page}`"
        @click.native="setCurrentPage(item.page)"
      >
        <template #default="{ isExactActive }">
          <li
            :class="[
              'pagination__item',
              { 'pagination__item--is-active': isExactActive },
            ]"
          >
            {{ item.title }}
          </li>
        </template>
      </VLink>
      <template v-if="currentPage < totalPage">
        <VLink :to="`/${currentPage + 1}`">
          <template #default="{ isExactActive }">
            <li
              :class="[
                'pagination__item',
                { 'pagination__item--is-active': isExactActive },
              ]"
            >
              <VSvg icon-id="next-icon" />
            </li>
          </template>
        </VLink>
      </template>
      <template v-else>
        <a>
          <li class="pagination__item">
            <VSvg icon-id="next-icon" />
          </li>
        </a>
      </template>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VSvg from '@/components/VSvg.vue'
import VLink from '@/components/VLink.vue'
import IPaginationItem from '@/types/IPaginationItem'

export default Vue.extend({
  components: { VLink, VSvg },
  data() {
    return {
      currentPage: Number(this.$route.params.page),
      firstVisiblePages: 2,
      lastVisiblePages: 2,
    }
  },
  computed: {
    totalCount(): number {
      return this.$store.getters['posts/getTotalCount']
    },
    totalPage(): number {
      return Math.ceil(this.totalCount / 9)
    },
    pagination(): IPaginationItem[] {
      const newPages: IPaginationItem[] = []

      const numOfLink = this.firstVisiblePages + 1 + this.lastVisiblePages

      if (this.totalPage - this.currentPage >= numOfLink) {
        let lastPagesNumStart = this.totalPage - this.lastVisiblePages + 1
        let firstPagesNumEnd = this.currentPage + this.firstVisiblePages - 1
        const threeDotsPage = this.currentPage + this.firstVisiblePages
        while (lastPagesNumStart <= this.totalPage) {
          newPages.push({
            title: lastPagesNumStart,
            page: lastPagesNumStart,
          })
          lastPagesNumStart++
        }

        newPages.unshift({ title: '...', page: threeDotsPage })

        while (firstPagesNumEnd >= this.currentPage) {
          newPages.unshift({
            title: firstPagesNumEnd,
            page: firstPagesNumEnd,
          })
          firstPagesNumEnd--
        }
      } else {
        let totalPage = this.totalPage
        while (totalPage > this.totalPage - numOfLink) {
          newPages.unshift({
            title: totalPage,
            page: totalPage,
          })
          totalPage--
        }
      }

      return newPages
    },
  },
  methods: {
    setCurrentPage(page: number) {
      this.currentPage = page
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  @include medium {
    padding: 40px 0 136px;
    justify-content: flex-end;
  }
  &__items {
    display: flex;
    gap: 8px;
  }
  &__item {
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 5px 4px;
    @include useFont(
      $family: sans-serif,
      $weight: 700,
      $size: 14px,
      $line-height: 20px
    );
    width: 24px;
    height: 22px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &--is-active {
      border: 1px solid $red-color;
      color: $red-color;
    }
  }
}
</style>
