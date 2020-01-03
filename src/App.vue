<template>
  <div id="app">
    <m-header @showSidebar="show"></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from './base/m-header/m-header'

  export default {
    components: { MHeader },
    created () {
    },
    methods: {
      show() {
        this.Sidebar = this.Sidebar || this.$createSidebar({})
        this.Sidebar.open()
      }
    }
  }
</script>

<style lang="stylus">
</style>
