import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '@/store'
import IComment from '@/types/IComment'

export const state = () => ({
  comments: [] as IComment[],
})

export type AnotherModuleState = ReturnType<typeof state>

export const getters: GetterTree<AnotherModuleState, RootState> = {
  getComments: (state) => state.comments,
}

export const mutations: MutationTree<AnotherModuleState> = {
  SET_COMMENTS: (state, payload: IComment[]) => (state.comments = payload),
}

export const actions: ActionTree<AnotherModuleState, RootState> = {
  async fetchComments({ commit }, id: number): Promise<void> {
    const data = await this.$axios.$get<IComment[]>(`/posts/${id}/comments`)
    commit('SET_COMMENTS', data)
  },
}
