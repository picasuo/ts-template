<template>
  <div>
    parent
    <!-- 嵌套路由  -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Test extends Vue {}
</script>

<style lang="scss" scoped></style>
