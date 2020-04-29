<template>
  <div class="home">
    <header class="header">
      <div class="header-logo"></div>
      <div class="header-account">
        <span class="account-name">管理员</span>
        <a class="account-spliter">|</a>
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
import SideBar from 'components/ui/SideBar.vue'

@Component({
  components: { SideBar },
})
export default class Home extends Vue {
  sides = [
    {
      name: 'test',
      url: '/test',
      icon: 'icon-check',
    },
    {
      name: '测试Flow',
      url: '/flow',
      children: [
        {
          name: '测试B',
          url: '/b',
          icon: 'icon-blacklist',
        },
      ],
    },
  ]
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    display: flex;
    justify-content: space-between;
    height: 58px;
    background: $header-bg;
    box-shadow: 0 2px 6px 0 rgba(49, 53, 65, 0.6);
    &-logo {
      width: 182px;
      height: 100%;
      background: linear-gradient(to right, #495068, #1d202b) right top
          no-repeat,
        url('~assets/images/image-brand-logo.png') center center no-repeat;
      background-size: 4px 100%, 110px 37px;
      cursor: pointer;
    }
    &-account {
      margin-right: 30px;
      height: 58px;
      line-height: 58px;
      cursor: pointer;
      .account-name {
        @include text(400, 14px, $white);
      }
      .account-spliter {
        margin: 0 12px;
        @include text(400, 13px, $color-grey-light-7);
      }
      .account-logout {
        @include text(400, 14px, $color-grey-light-4);
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
      background-color: $background-color;
    }
  }
}
</style>
