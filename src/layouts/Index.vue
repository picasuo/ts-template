<template>
  <div class="index">
    <header class="header">
      <router-link class="header-logo" to="/">sx-ts-template</router-link>
      <head-bar :tabs="tabs" @on-select="onHeadSelect" />
      <div class="header-account">
        <span class="account-name">管理员</span>
        <a class="account-splitter">|</a>
        <span class="account-logout">退出</span>
      </div>
    </header>
    <main class="main">
      <side-bar :sides="sides" />
      <section class="view">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import HeadBar from 'components/ui/HeadBar.vue'
import SideBar from 'components/ui/SideBar.vue'

import { IndexRoutes } from 'router/routes'
import { tabBuilder, sideBuilder } from 'utils/index'

@Component({
  components: { HeadBar, SideBar },
})
export default class Index extends Vue {
  tabs = tabBuilder(IndexRoutes)
  sides = sideBuilder(IndexRoutes)

  onHeadSelect(url) {
    if (url.indexOf('http') !== -1) window.open(url)
    else {
      url = `/${url}`
      const side = this.sides.find(v => v.url === url)
      if (side && !_.isEmpty(side.children)) {
        const path = url + side.children[0].url
        if (this.$route.path !== path) this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .header {
    @include flex($x: flex-start);
    height: 58px;
    background: $header-bg;
    box-shadow: 0 2px 6px 0 rgba(49, 53, 65, 0.6);
    &-logo {
      @include text(
        normal,
        $lgr-size,
        $text-color-inverse,
        58px,
        'PingFang SC'
      );
      width: 182px;
      height: 100%;
      text-align: center;
      background: linear-gradient(90deg, #495068, #1d202b) 100% 0 no-repeat;
      background-size: 4px 100%;
      cursor: pointer;
    }
    &-account {
      position: absolute;
      right: 30px;
      height: 58px;
      line-height: 58px;
      cursor: pointer;
      .account-name {
        @include text(400, 14px, $color-white);
      }
      .account-splitter {
        margin: 0 12px;
        @include text(400, 13px, $text-color-grey);
      }
      .account-logout {
        @include text(400, 14px, $text-color-light);
      }
    }
  }
  .main {
    display: flex;
    height: calc(100vh - 58px);
    .view {
      flex: 1;
      height: calc(100vh - 58px);
      padding: 0 get-vw(30px);
      overflow: auto;
      background-color: $bg-color-grey;
    }
  }
}
</style>
