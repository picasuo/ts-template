<template>
  <div :class="classes">
    <div class="sidebar-toggle">
      <sx-icon
        type="icon-menu"
        color="white"
        size="small"
        @click="isFold = !isFold"
      />
    </div>
    <i-menu
      class="sidebar-menu"
      theme="dark"
      width="100%"
      :active-name="acitveName"
      accordion
      @on-select="onSelect"
    >
      <template v-for="item in sides">
        <i-sub-menu
          v-if="item.children"
          :key="item.name"
          :ref="item.url"
          :name="item.url"
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
            :name="item.url + sub.url"
          >
            <sx-icon
              :type="sub.icon"
              color="rgba(255, 255, 255, 0.7)"
              size="small"
            />
            <span class="item-name">{{ sub.name }}</span>
          </i-menu-item>
        </i-sub-menu>
        <i-menu-item v-else :key="item.name" :name="item.url">
          <sx-icon
            :type="item.icon"
            color="rgba(255, 255, 255, 0.7)"
            size="small"
          />
          <span class="item-name">{{ item.name }}</span>
        </i-menu-item>
      </template>
    </i-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Menu, Submenu, MenuItem } from 'iview'

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

  isFold = false
  acitveName = ''

  get classes() {
    return {
      sidebar: true,
      'sidebar-fold': this.isFold,
    }
  }

  @Watch('$route')
  routeWatcher(route) {
    const arr = route.path.split('/')
    this.acitveName = this.$route.path
    if (arr.length === 3) this.$refs[arr.slice(0, 2).join('/')][0].opened = true
  }

  mounted() {
    const arr = this.$route.path.split('/')
    this.acitveName = this.$route.path
    // 由于 iview submenu 无法根据  open-names 打开对应 submune 直接获取 submenu 修改其 opened
    if (arr.length === 3) this.$refs[arr.slice(0, 2).join('/')][0].opened = true
  }

  onSelect(v) {
    if (v !== this.$route.path) this.$router.push(`${v}`)
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 180px;
  height: 100%;
  background-color: $sidebar-bg;
  transition: width 0.3s ease-in-out;
  user-select: none;
  & /deep/ .ivu-menu-submenu-title-icon {
    display: none;
  }
  &-fold {
    width: 64px;
    .sidebar-toggle .sui-icon {
      transform: rotateZ(90deg);
    }
    span {
      display: none;
    }
    .ivu-menu-item {
      padding-left: 24px !important;
    }
  }
  &-toggle {
    width: 100%;
    height: 34px;
    line-height: 34px;
    background-color: $sidebar-toggle-bg;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: width 0.3s ease-in-out;
    .sui-icon {
      transition: transform 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        fill: $primary-color;
      }
    }
  }
  .ivu-menu {
    background-color: $sidebar-bg !important;
    &-item {
      width: 100%;
      height: 57px;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      .item-name {
        margin-left: 14px;
        @include text($nm-font-weight, $sm-size);
      }
    }
    &-submenu {
      &-title {
        @include text($nm-font-weight, $sm-size);
        width: 100%;
        height: 57px;
        display: inline-flex;
        align-items: center;
        background-color: $sidebar-bg !important;
        .submenu-icon {
          width: 12px;
          height: 12px;
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
        background-color: $primary-color;
      }
    }
  }

  .ivu-menu-dark.ivu-menu-vertical {
    .ivu-menu-item-selected,
    .ivu-menu-item-selected:hover {
      color: $primary-color;
      background: $sidebar-item-selected-bg !important;
      .sui-icon {
        fill: $primary-color !important;
      }
    }
    .ivu-menu-item:not(.ivu-menu-item-active):hover,
    .ivu-menu-submenu-title:hover {
      background-color: $sidebar-item-hover-bg !important;
      .sui-icon {
        fill: $white;
      }
    }
  }
}
</style>
