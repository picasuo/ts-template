import Vue from 'vue'
import Vuex from 'vuex'
import { persist } from 'config/vuexPlugins'

import { getModule } from 'vuex-module-decorators'

import Session from 'store/modules/session'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Session,
  },
  plugins: [persist.plugin],
})

export default store

export const session = getModule(Session, store)
