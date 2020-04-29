import VuexPersist from 'vuex-persist'

const persist = new VuexPersist({
  storage: window.localStorage,
  // 仅对设置的模块进行本地存储
  modules: [],
})

export { persist }
