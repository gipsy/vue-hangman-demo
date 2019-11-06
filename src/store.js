// import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

// const appId = 'f16da50b'
// const appKey = '826d44c1d66f95c3cfaabf42082aab46'
// const endpoint = 'domains'
// const lang = 'en-us'

// const httpClient = axios.create({
//   baseURL: `https://od-api.oxforddictionaries.com/api/v2/${endpoint}/${lang}`,
//   headers: {
//     'Content-Type': 'application/json',
//     'app_id': appId,
//     'app_key': appKey,
//     Authorization: `No Auth`,
//   },
// })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    words: []
  },
  // mutations: {
  //   getWords(state, words) {
  //
  //   }
  // },
  actions: {
  }
})
