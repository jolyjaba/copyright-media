import { Plugin } from '@nuxt/types'

const axios: Plugin = ({ $axios, store }) => {
  $axios.onResponse((response) => {
    if (response.status === 200) {
      const count = response.headers['x-total-count']
      if (count && !isNaN(count)) {
        store.commit('posts/SET_TOTAL_COUNT', +count)
      }
    }
  })
}

export default axios
