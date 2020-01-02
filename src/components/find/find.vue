<template>
  <div class="find-wrap">
    <div v-if="sliders.length" class="slide-container">
      <cube-slide ref="slide" :data="sliders">
        <cube-slide-item v-for="(item, index) in sliders" :key="index">
          <a href="javascript:void (0);">
            <img v-lazy="item.pic">
            <i :class="item.titleColor">{{item.typeTitle}}</i>
          </a>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'find',
    data() {
      return {
        sliders: []
      }
    },
    created() {
      this._getSlider()
    },
    methods: {
      _getSlider() {
        this.$api.find.getSlider().then((res) => {
          this.sliders = res.data.banners
          console.log(this.sliders)
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/mixin"
  @import "~@common/stylus/variable"
  .find-wrap
    padding-top 40px

  .slide-container
    width 345px
    height 130px
    transform translateZ(0px)
    overflow hidden
    margin 0 auto
    border-radius 10px

    img
      width 345px;
      height: auto !important;

    .cube-slide-item
      position relative

      i
        display block
        width auto
        height 22px
        line-height 22px
        text-align center
        padding: 0 10px;
        position absolute
        bottom 0
        right 0
        z-index 40
        color $color-white
        font-style normal
        font-size $font-size-small-s
        overflow hidden
        white-space normal
        border-top-left-radius 10px

        &.red
          background-color $color-theme

        &.blue
          background-color $color-blue

    >>> .cube-slide-dots
      bottom 8px

    >>> span
      width 8px
      height 8px
      border-radius 50%
      margin 0 2px

      &.active
        background-color: $color-theme!important
</style>
