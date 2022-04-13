import { GetterTree, ActionTree, MutationTree } from 'vuex'
import IPost from '~/types/IPost'

export const state = () => ({
  posts: [] as IPost[],
  currentPost: {},
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getPosts: (state) => state.posts,
}

export const mutations: MutationTree<RootState> = {
  SET_POSTS: (state, payload: IPost[]) => (state.posts = payload),
  SET_POST: (state, payload: IPost[]) => (state.currentPost = payload),
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchPosts', { page: 1, limit: 9 })
  },
  async fetchPosts({ commit }, { page, limit }) {
    const data = await this.$axios.$get<IPost[]>(
      `/posts?_embed=comments&_page=${page}&_limit=${limit}`
    )
    commit('SET_POSTS', data)
  },
  async fetchPost({ commit }, id: number | string) {
    const data = await this.$axios.$get(`/posts/${id}`)
    commit('SET_POST', data)
  },
}
