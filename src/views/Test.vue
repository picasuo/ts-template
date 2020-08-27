<template>
  <div>
    {{ isP ? 'parent' : 'child' }}
    <sx-button @click="click">click</sx-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  beforeRouteUpdate(to, from, next) {
    console.log(to)
    next()
  },
})
export default class Test extends Vue {
  isP = true

  @Watch('$route')
  routeWatcher(to, from) {
    console.log(!!to.query.id)

    this.isP = !to.query.id
  }

  click() {
    if (this.isP) this.$router.push('/i-t?id=1')
    else this.$router.go(-1)
  }
}
</script>

<style lang="scss" scoped></style>
