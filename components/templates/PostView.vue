<template>
  <article class="post">
    <img
      class="post__bg-image"
      src="@/assets/images/Article_cover_1.png"
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
.post {
  &__bg-image {
    display: block;
    width: 100%;
  }
  &__content {
    position: relative;
    top: -42px;
    padding: 0 16px;
  }
  &__title {
    font-family: 'Manrope';
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    padding-top: 16px;
    padding-bottom: 32px;
    border-bottom: 1px solid #d1d1d6;
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
  }
}

.comments {
  &__title {
    font-family: Manrope;
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
    padding: 16px 0;
  }
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
