<template>
  <div>
    <PostHeader class="only-mobile" />
    <BaseHeader class="only-medium" />
    <main>
      <VContainer>
        <article class="post">
          <VImage
            class="post__header-background"
            :src="require('@/assets/images/Article_cover_2.png')"
          />
          <section class="post__content">
            <h1 class="post__title">
              {{ getCurrentPost.title }}
            </h1>
            <form
              class="post__body"
              @reset="onCancelChanges"
              @submit.prevent="onSaveChanges"
            >
              <p v-if="!isEdit">{{ getCurrentPost.body }}</p>
              <textarea
                v-else
                v-model="editForm"
                class="post__edit-field"
                cols="30"
                rows="10"
              />
              <span v-if="!isEdit" class="post__edit" @click="onEdit">
                <VSvg icon-id="pen-icon" />
                Редактировать текст
              </span>
              <div v-else class="post__actions">
                <BaseButton type="submit"> Сохранить изменения </BaseButton>
                <BaseButton type="reset" button-style="ghost">
                  Отменить
                </BaseButton>
              </div>
            </form>
          </section>
          <div class="post__comments">
            <p class="post__comments-title">Комментарии</p>
            <VList :list="getComments">
              <template #default="{ item }">
                <VComment :item="item" />
              </template>
            </VList>
          </div>
        </article>
      </VContainer>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IPost from '@/types/IPost'
import IComment from '@/types/IComment'
import VSvg from '@/components/VSvg.vue'
import VList from '@/components/VList.vue'
import VImage from '@/components/VImage.vue'
import PostHeader from '@/components/PostHeader.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import VContainer from '@/components/VContainer.vue'
import VComment from '@/components/VComment.vue'

export default Vue.extend({
  components: {
    BaseButton,
    VComment,
    PostHeader,
    VImage,
    VSvg,
    VList,
    BaseHeader,
    VContainer,
  },
  async asyncData(ctx): Promise<void> {
    const id = ctx.route.params.id
    await ctx.store.dispatch('posts/fetchPost', id)
    await ctx.store.dispatch('comments/fetchComments', id)
  },
  data() {
    return {
      editForm: '' as string,
      isEdit: false as boolean,
    }
  },
  computed: {
    getCurrentPost(): IPost {
      return this.$store.getters['posts/getCurrentPost']
    },
    getComments(): IComment[] {
      return this.$store.getters['comments/getComments']
    },
  },
  methods: {
    onEdit(): void {
      this.isEdit = true
      this.editForm = this.getCurrentPost.body
    },
    async onSaveChanges(): Promise<void> {
      await this.$store.dispatch('posts/updatePost', {
        id: this.$route.params.id,
        payload: this.editForm,
      })
      this.onCancelChanges()
    },
    onCancelChanges(): void {
      this.isEdit = false
      this.editForm = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.post {
  &__header-background {
    height: 280px;
    object-fit: cover;
  }
  &__content {
    padding: 0 16px;
    @include medium {
      padding: 0;
    }
  }
  &__title {
    @include useFont($size: 32px, $weight: 700, $line-height: 36px);
    padding-top: 16px;
    padding-bottom: 32px;
    border-bottom: 1px solid #d1d1d6;
    @include medium {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
  &__body {
    @include useFont($size: 17px, $weight: 400, $line-height: 22px);
    color: $text-body-color;
    padding-top: 32px;
    padding-bottom: 16px;
    gap: 20px;
    display: grid;
    @include medium {
      padding-top: 30px;
      padding-bottom: 15px;
      gap: 30px;
    }
  }
  &__edit {
    display: flex;
    gap: 20px;
    align-items: center;
    color: $red-color;
    &-field {
      outline: none;
      padding: 20px;
      border: 1px solid #d1d1d6;
      border-radius: 8px;
      @include useFont($size: 18px, $weight: 400, $line-height: 30px);
    }
  }
  &__actions {
    display: grid;
    gap: 20px;
    @include medium {
      grid-auto-flow: column;
      grid-template-columns: 309px 325px;
      gap: 30px;
    }
  }
  &__comments {
    &-title {
      @include useFont($size: 20px, $weight: 500, $line-height: 50px);
      padding: 16px;
      @include medium {
        line-height: 33px;
        padding: 15px 0;
      }
    }
  }
}

.only {
  &-mobile {
    @include medium {
      display: none;
    }
  }
  &-medium {
    display: none;
    @include medium {
      display: grid;
    }
  }
}
</style>
