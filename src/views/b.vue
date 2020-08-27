<template>
  <div>b <sx-button @click="click">back</sx-button></div>
</template>

<script>
export default {
  methods: {
    click() {
      this.$router.go(-1)
    },
  },
}
</script>

<style></style>
