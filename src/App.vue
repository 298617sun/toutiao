<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    this.getChannel()
  },
  methods: {
    async getChannel () {
      const { data } = await this.$api.channel.getAllChannel()
      this.$store.commit('setAllChannel', data.channels)
    }
  }
}
</script>
<style lang="less">
</style>
