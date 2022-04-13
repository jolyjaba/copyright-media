<template>
  <article class="post">
    <img
      class="post__bg-image"
      src="@/assets/images/Article_cover_1.png"
      alt="Article_cover_1"
    />
    <img
      class="post__bg-image--medium"
      src="@/assets/images/Article_cover_2.png"
      alt="Article_cover_1"
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
          <svg class="icon">
            <use xlink:href="@/assets/icons/main.svg#pen-icon" />
          </svg>
          Редактировать текст
        </span>
        <div v-else class="post__actions">
          <BaseButton type="submit"> Сохранить изменения </BaseButton>
          <BaseButton type="reset" button-style="ghost"> Отменить </BaseButton>
        </div>
      </form>
      <div class="comments">
        <p class="comments__title">Комментарии</p>
        <ul>
          <li v-for="item in getComments" :key="item.id">
            <BaseComment :item="item" />
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import IComment from '@/types/IComment'
import IPost from '@/types/IPost'
import BaseComment from '@/components/atoms/BaseComment.vue'
import BaseButton from '@/components/molecules/BaseButton.vue'

export default Vue.extend({
  components: { BaseComment, BaseButton },
  data() {
    return {
      editForm: '',
      isEdit: false,
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
    onEdit() {
      this.isEdit = true
      this.editForm = this.getCurrentPost.body
    },
    async onSaveChanges() {
      await this.$store.dispatch('posts/updatePost', {
        id: this.$route.params.id,
        payload: this.editForm,
      })
      this.onCancelChanges()
    },
    onCancelChanges() {
      this.isEdit = false
      this.editForm = ''
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/breakpoint.scss';

.post {
  &__bg-image {
    display: block;
    width: 100%;
    @include medium {
      display: none;
    }
    &--medium {
      display: none;
      @include medium {
        display: block;
        width: 100%;
        max-width: $max-width-container;
        margin: 0 auto;
      }
    }
  }
  &__content {
    position: relative;
    top: -42px;
    padding: 0 16px;
    @include medium {
      top: 0;
      padding: 0;
      max-width: $max-width-container;
      margin: 0 auto;
    }
  }
  &__title {
    font-family: 'Manrope';
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    padding-top: 16px;
    padding-bottom: 32px;
    border-bottom: 1px solid #d1d1d6;
    @include medium {
      padding-top: 25px;
      padding-bottom: 30px;
    }
  }
  &__body {
    font-family: 'Manrope';
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    color: rgba(60, 60, 67, 0.6);
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
    color: #ff008a;
    &-field {
      outline: none;
      padding: 20px;
      border: 1px solid #d1d1d6;
      border-radius: 8px;
      font-family: 'Manrope';
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
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
}

.comments {
  &__title {
    font-family: Manrope;
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
    padding: 16px 0;
    @include medium {
      line-height: 33px;
      padding: 15px 0;
    }
  }
  ul {
    @include medium {
      padding-top: 15px;
      li {
        margin-bottom: 20px;
      }
    }
  }
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
