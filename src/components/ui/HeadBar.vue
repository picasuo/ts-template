<template>
  <ul class="head-bar">
    <li
      v-for="item in tabs"
      :key="item.url"
      :class="{ 'head-bar-item': true, selected: selectedTab === item.url }"
      @click="onSelect(item.url)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class HeadBar extends Vue {
  @Prop({
    type: Array,
    required: true,
  })
  tabs!: any[]

  get selectedTab() {
    const sp = this.$route.path.split('/')
    return sp.length > 2 ? `${sp[1]}` : ''
  }

  @Emit()
  onSelect(url) {}
}
</script>

<style lang="scss" scoped>
.head-bar {
  @include flex($x: flex-start);
  height: 58px;
  &-item {
    @include text(normal, $nm-size, $text-color-inverse, 58px);
    width: 157px;
    background: linear-gradient(to right, #495068, #1d202b) right top no-repeat;
    background-size: 4px 100%;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: #71c9ff;
    }
  }
  .selected {
    color: #71c9ff;
  }
}
</style>
