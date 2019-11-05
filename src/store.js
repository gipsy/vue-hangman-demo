import axios from 'axios'
import { mapResourceModules } from '@reststate/vuex'
import Vue from 'vue'
import Vuex from 'vuex'

const appId = 'f16da50b'
const appKey = '826d44c1d66f95c3cfaabf42082aab46'

const httpClient = axios.create({
  baseURL: 'https://od-api.oxforddictionaries.com/api/v2/domains/en-gb',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${appKey}`,
  },
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ...mapResourceModules({
      httpClient,
      names: ['words'],
    })
  },
})
