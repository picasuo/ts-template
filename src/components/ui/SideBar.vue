<template>
  <div ref="wrapper" :class="classes">
    <div class="sidebar-toggle">
      <sx-icon
        ref="toggle"
        type="icon-menu"
        color="white"
        size="small"
        @click="triggerFold"
      />
    </div>
    <i-menu
      class="sidebar-menu"
      theme="dark"
      width="100%"
      :active-name="activeName"
      accordion
      @on-select="onSelect"
    >
      <template v-for="(item, index) in sides">
        <div v-show="item.url === selectedTab" :key="index">
          <i-sub-menu
            v-if="item.name"
            :key="item.name"
            :ref="item.name"
            :name="item.name"
          >
            <template slot="title">
              <sx-icon
                class="submenu-icon"
                type="icon-arrow-down"
                color="rgba(255, 255, 255, 0.7)"
              />
              <span class="submenu-text">{{ item.name }}</span>
            </template>
            <i-menu-item
              v-for="sub in item.children"
              :key="sub.name"
              :name="(item.url && item.url !== '/' ? item.url : '') + sub.url"
            >
              <sx-icon
                :type="sub.icon"
                color="rgba(255, 255, 255, 0.7)"
                size="small"
              />
              <span class="item-name">{{ sub.name }}</span>
            </i-menu-item>
          </i-sub-menu>
          <template v-else>
            <i-menu-item
              v-for="sub in item.children"
              :key="sub.name"
              :name="(item.url && item.url !== '/' ? item.url : '') + sub.url"
            >
              <sx-icon
                :type="sub.icon"
                color="rgba(255, 255, 255, 0.7)"
                size="small"
              />
              <span class="item-name">{{ sub.name }}</span>
            </i-menu-item>
          </template>
        </div>
      </template>
    </i-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Velocity from 'velocity-animate/velocity.min'

import { Menu, Submenu, MenuItem } from 'iview'

import { TAB_REG } from 'config/const'

@Component({
  components: {
    IMenu: Menu,
    ISubMenu: Submenu,
    IMenuItem: MenuItem,
  },
})
export default class SideBar extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  sides!: any[]

  wrapper!: any
  toggle!: any
  isFold = false
  activeName = ''
  selectedTab = ''
  subMap = {}

  get classes() {
    return {
      sidebar: true,
      fold: this.isFold,
    }
  }

  get tabMap() {
    const t = {}
    this.sides.forEach(({ url }) => {
      if (!t[url]) t[url] = url
    })
    return t
  }

  // get selectedTab() {
  //   const res = TAB_REG.exec(this.$route.path)
  //   return res && this.tabMap[`/${res[1]}`] ? `/${res[1]}` : '/'
  // }

  @Watch('$route')
  routeWatcher({ path }) {
    this.selectUrl(path)
  }

  mounted() {
    this.wrapper = this.$refs.wrapper
    this.toggle = this.$refs.toggle

    const {
      $route: { path },
      sides,
    } = this

    this.subMap = sides.reduce((p, v) => {
      if (v.name && Array.isArray(v.children) && v.children.length > 0)
        v.children.forEach(c => {
          p[c.url] = v.name
        })
      return p
    }, {})

    this.selectUrl(path)
  }

  selectUrl(path) {
    const match = path.match(TAB_REG)
    if (match) {
      const tabMatch = this.tabMap[`/${match[0]}`]
      this.selectedTab = tabMatch || '/'
      path = tabMatch ? `/${match[0]}/${match[1]}` : `/${match[0]}`
      this.activeName = path
      const ref = this.$refs[this.subMap[`/${match[tabMatch ? 1 : 0]}`]]
      if (ref) ref[0].opened = true
    }
  }

  onSelect(v) {
    if (v !== this.$route.path) this.$router.push(`${v}`)
  }

  triggerFold() {
    const {
      isFold,
      wrapper,
      toggle: { $el },
    } = this
    Velocity(
      wrapper,
      {
        width: isFold ? 180 : 64,
      },
      {
        duration: 200,
        begin: () => {
          if (!isFold) this.isFold = true
        },
        complete: () => {
          if (isFold) this.isFold = false
        },
      }
    )
    Velocity(
      $el,
      {
        rotateZ: isFold ? 0 : 90,
      },
      {
        duration: 200,
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 180px;
  height: 100%;
  background-color: $sidebar-bg;
  user-select: none;
  &-toggle {
    @include flex();
    width: 100%;
    height: 34px;
    line-height: 34px;
    background-color: $sidebar-toggle-bg;
    .sui-icon {
      cursor: pointer;
      &:hover {
        fill: $color-primary;
      }
    }
  }
  & /deep/ .ivu-menu {
    background-color: $sidebar-bg !important;
    &-item {
      @include flex($flex: inline-flex, $x: flex-start);
      width: 100%;
      height: 57px;
      cursor: pointer;
      .item-name {
        @include text(normal, $sm-size);
        margin-left: 14px;
      }
    }
    &-submenu {
      &-title {
        @include flex($flex: inline-flex, $x: flex-start);
        @include text(normal, $sm-size, rgba(255, 255, 255, 0.7));
        width: 100%;
        height: 57px;
        background-color: $sidebar-bg !important;
        &-icon {
          display: none;
        }
        .submenu-icon {
          width: $sml-size;
          height: $sml-size;
          transform: rotateZ(-90deg);
          transition: transform 0.3s ease-in-out;
        }
        .submenu-text {
          margin-left: 18px;
        }
      }
    }
    .ivu-menu-opened {
      .ivu-menu-submenu-title {
        .submenu-icon {
          transform: rotateZ(0);
        }
      }
    }
    .ivu-menu-item-selected {
      background: $sidebar-item-selected-bg !important;
      box-shadow: inset 0 2px 8px 0 rgba(0, 0, 0, 0.4);
      border-right: 0 !important;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 6px;
        height: 100%;
        background-color: $color-primary;
      }
    }
  }
  & /deep/ .ivu-menu-dark.ivu-menu-vertical {
    .ivu-menu-item-selected,
    .ivu-menu-item-selected:hover {
      color: $color-primary;
      background: $sidebar-item-selected-bg !important;
      .sui-icon {
        fill: $color-primary !important;
      }
    }
    .ivu-menu-item:not(.ivu-menu-item-active):hover,
    .ivu-menu-submenu-title:hover {
      background-color: $sidebar-item-hover-bg !important;
      .sui-icon {
        fill: $color-white;
      }
    }
  }
}
.fold {
  .item-name,
  .submenu-text {
    display: none;
  }
  .ivu-menu-item {
    padding-left: 24px !important;
  }
}
</style>
