<template>
  <div class="wrap">
    <transition name="fold">
      <div class="sidebar" v-show="showSidebar">
        <div class="list">
          <ul>
            <li @click="hide">
              <span class="icon-home"></span>
              <router-link to="/">首页</router-link>
            </li>
            <li @click="hide">
              <span class="icon-home"></span>
              <router-link to="/">首页</router-link>
            </li>
            <li @click="hide">
              <span class="icon-home"></span>
              <router-link to="/">首页</router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click.stop.prevent="hide" v-show="showSidebar"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        showSidebar: false
      }
    },
    methods: {
      open () {
        this.showSidebar = true
      },
      hide () {
        this.showSidebar = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/variable"
  .sidebar
    position fixed
    top 0
    left 0
    z-index 100
    width 300px
    height 100%
    background-color $color-background
    transform translate3d(0, 0, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all .5s
    &.fold-enter, &.fold-leave-active
      transform translate3d(-100%, 0, 0)
    .list
      background-color $color-theme-d
      li
        font-size $font-size-large
        color $color-theme
        padding 16px
        a
          color $color-theme
          margin-left 18px
          font-size $font-size-medium-x
  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-background-back-s
    opacity 1
    z-index 99
    &.fade-enter-active, &.fade-leave-active
      transitio all .5s
    &.fade-enter, &.fade-leave-active
      opacity 0
</style>
