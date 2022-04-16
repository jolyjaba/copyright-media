import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '@/store'
import IPost from '@/types/IPost'

export const state = () => ({
  posts: [] as IPost[],
  currentPost: {} as IPost,
  totalCount: 0,
  searchText: '',
})

export type AnotherModuleState = ReturnType<typeof state>

export const getters: GetterTree<AnotherModuleState, RootState> = {
  getPosts: (state) => state.posts,
  getCurrentPost: (state) => state.currentPost,
  getTotalCount: (state) => state.totalCount,
  getSearchText: (state) => state.searchText,
}

export const mutations: MutationTree<AnotherModuleState> = {
  SET_POSTS: (state, payload: IPost[]) => (state.posts = payload),
  SET_CURRENT_POST: (state, payload: IPost) => (state.currentPost = payload),
  SET_TOTAL_COUNT: (state, payload: number) => (state.totalCount = payload),
  SET_SEARCH_TEXT: (state, payload: string) => (state.searchText = payload),
}

export const actions: ActionTree<AnotherModuleState, RootState> = {
  async fetchPosts(
    { commit },
    {
      page,
      limit = 9,
      searchText = '',
    }: { page: number; limit: number; searchText: string }
  ): Promise<void> {
    let data: IPost[] = []
    if (!searchText) {
      data = await this.$axios.$get<IPost[]>(
        `/posts?_embed=comments&_page=${page}&_limit=${limit}`
      )
    } else {
      commit('SET_SEARCH_TEXT', searchText)
      data = await this.$axios.$get<IPost[]>(
        `/posts?_embed=comments&_page=${1}&_limit=${limit}&q=${searchText}`
      )
    }
    commit('SET_POSTS', data)
  },
  async fetchPost({ commit }, id: number | string): Promise<void> {
    const data = await this.$axios.$get<IPost>(`/posts/${id}`)
    commit('SET_CURRENT_POST', data)
  },
  async updatePost(
    { commit },
    { id, payload }: { id: number; payload: string }
  ): Promise<void> {
    const data = await this.$axios.$patch<IPost>(`/posts/${id}`, {
      body: payload,
    })
    commit('SET_CURRENT_POST', data)
  },
}
