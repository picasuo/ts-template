import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'Session' })
export default class Session extends VuexModule {
  // user token
  token = ''
  // user info
  user = null

  get isLogin() {
    return !_.isEmpty(this.token)
  }

  @Mutation
  SET_TOKEN(token) {
    this.token = token
  }

  @Mutation
  SET_USER(user) {
    this.user = user
  }

  // clear user data & storage
  @Mutation
  clear() {
    this.token = ''
    this.user = null
  }
}
