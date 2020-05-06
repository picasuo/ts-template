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
      <template v-for="item in sideList">
        <i-sub-menu
          v-if="item.children"
          :key="item.name"
          :ref="item.url || item.children[0].url"
          :name="item.url || ''"
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
            :name="item.url || '' + sub.url"
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
  subMap

  get classes() {
    return {
      sidebar: true,
      'sidebar-fold': this.isFold,
    }
  }

  get sideList() {
    return this.sides.filter(
      v => v.url || (Array.isArray(v.children) && v.children.length > 0),
    )
  }

  @Watch('$route')
  routeWatcher({ path }) {
    this.selectUrl(path)
  }

  mounted() {
    const {
      $route: { path },
      sideList,
    } = this
    this.subMap = sideList.reduce((p, v) => {
      if (Array.isArray(v.children) && v.children.length > 0)
        p[v.url || v.children[0].url] = true
      return p
    }, {})
    this.selectUrl(path)
  }

  selectUrl(path) {
    this.acitveName = path
    if (this.subMap[path]) this.$refs[path][0].opened = true
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
  & /deep/ .ivu-menu {
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
        @include text($nm-font-weight, $sm-size, rgba(255, 255, 255, 0.7));
        width: 100%;
        height: 57px;
        display: inline-flex;
        align-items: center;
        background-color: $sidebar-bg !important;
        &-icon {
          display: none;
        }
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
  & /deep/ .ivu-menu-dark.ivu-menu-vertical {
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
