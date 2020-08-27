<template>
  <div>a <sx-button @click="button">click</sx-button></div>
</template>

<script>
export default {
  methods: {
    button() {
      this.$router.push('/mall/o-g-t1/1')
    },
  },
}
</script>

<style></style>
