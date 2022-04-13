<template>
  <section v-if="totalCount" class="pagination">
    <ul class="pagination__items">
      <template v-if="currentPage > 1">
        <NuxtLink :to="`/${currentPage - 1}`">
          <li class="pagination__item">
            <svg>
              <use xlink:href="@/assets/icons/main.svg#prev-icon" />
            </svg>
          </li>
        </NuxtLink>
      </template>
      <template v-else>
        <a>
          <li class="pagination__item">
            <svg>
              <use xlink:href="@/assets/icons/main.svg#prev-icon" />
            </svg>
          </li>
        </a>
      </template>
      <NuxtLink
        v-for="item in pagination"
        :key="item.page"
        :to="`/${item.page}`"
        @click.native="setCurrentPage(item.page)"
      >
        <li class="pagination__item">
          {{ item.title }}
        </li>
      </NuxtLink>
      <template v-if="currentPage < totalPage">
        <NuxtLink :to="`/${currentPage + 1}`">
          <li class="pagination__item">
            <svg>
              <use xlink:href="@/assets/icons/main.svg#next-icon" />
            </svg>
          </li>
        </NuxtLink>
      </template>
      <template v-else>
        <a>
          <li class="pagination__item">
            <svg>
              <use xlink:href="@/assets/icons/main.svg#next-icon" />
            </svg>
          </li>
        </a>
      </template>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      currentPage: +this.$route.params.page,
      firstVisiblePages: 2,
      lastVisiblePages: 2,
    }
  },
  computed: {
    totalCount(): number {
      return this.$store.getters['posts/getTotalCount']
    },
    totalPage() {
      const totalCount = this.totalCount as number
      return Math.ceil(totalCount / 9)
    },
    pagination() {
      const newPages = []

      const numOfLink = this.firstVisiblePages + 1 + this.lastVisiblePages

      if (this.totalPage - this.currentPage >= numOfLink) {
        let lastPagesNumStart = (this.totalPage -
          this.lastVisiblePages +
          1) as number
        let firstPagesNumEnd = (this.currentPage +
          this.firstVisiblePages -
          1) as number
        const threeDotsPage = (this.currentPage +
          this.firstVisiblePages) as number
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
        let totalPage = this.totalPage as number
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
  &__items {
    display: flex;
    gap: 8px;
  }
  a {
    color: unset;
    text-decoration: none;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    &.nuxt-link-exact-active {
      border: 1px solid #ff008a;
      color: #ff008a;
    }
  }
  &__item {
    padding: 5px 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    width: 24px;
    height: 22px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
