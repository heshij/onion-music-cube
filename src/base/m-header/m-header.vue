<template>
  <div class="header">
    <span class="icon-menu" @click="showSidebar"></span>
    <ul class="menu">
      <li><router-link to="home">我的</router-link></li>
      <li><router-link to="find">发现</router-link></li>
      <li><router-link to="cloud">云村</router-link></li>
      <li><router-link to="video">视频</router-link></li>
    </ul>
    <span class="icon-search"></span>
  </div>
</template>

<script>
  export default {
    name: 'm-header',
    props: {
      title: {
        type: String,
        default: '首页'
      }
    },
    methods: {
      showSidebar () {
        this.$emit('showSidebar')
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/mixin"
  @import "~@common/stylus/variable"
  .header
    position fixed
    top 0
    left 0
    width 100%
    height 40px
    z-index 99
    display flex
    justify-content space-between
    background-color $color-background
    color $color-title
    font-size $font-size-large
    line-height 40px
    .menu
      display flex
      justify-content space-around
      width 62%
      font-size $font-size-medium-x
      color $color-title-s
      li
        a
          transition color,font-weight .2s
          &.router-link-active
            color $color-title
            font-size $font-size-large
            font-weight bold
    span
      line-height 20px
      font-size $font-size-large-x
      display block
      padding 10px
      color $color-title-d
</style>
