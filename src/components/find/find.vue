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
    <div class="song-card-title">
      <h2 class="_h2">推荐歌单</h2>
      <router-link to="/song-lists" tag="span">歌单广场</router-link>
    </div>
    <song-card :songList="songList" @select="goSongListDetail"></song-card>
    <div v-show="!songList.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
  import { getRandomArr } from '@common/js/utils'
  import { ERR_OK } from '../../api/config'
  import SongCard from '../../base/song-card/song-card'
  import Loading from '../../base/loading/loading'

  export default {
    name: 'find',
    components: { Loading, SongCard },
    data () {
      return {
        sliders: [],
        songList: []
      }
    },
    created () {
      // 获取banner
      this._getSlider()
      // 获取推荐歌单
      this._getRecSongList()
    },
    methods: {
      _getSlider () {
        this.$api.find.getSlider().then((res) => {
          this.sliders = res.data.banners
          // console.log('sliders: ', this.sliders)
        })
      },
      async _getRecSongList () {
        try {
          const { data } = await this.$api.find.getRecSongList()
          if (data.code === ERR_OK) {
            this.songList = getRandomArr(data.playlists, 6)
            console.log('songList:', this.songList)
          }
        } catch (error) {
          const toast = this.$createToast({
            time: 2000,
            txt: '请求超时'
          })
          toast.show()
          console.log(error)
        }
      },
      goSongListDetail (songList) {
        this.$router.push({
          path: `/song-lists/${songList.id}`
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/mixin"
  @import "~@common/stylus/variable"
  .find-wrap
    padding-top 50px

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
      background-color $color-white-o

      &.active
        background-color: $color-theme!important

  .song-card-title
    display flex
    justify-content space-between
    flex-wrap nowrap
    padding 0 15px
    margin-top 14px

    ._h2
      font-size $font-size-medium-x
      color $color-title-d
      font-weight bold
      line-height 24px

    span
      display block
      height 24px
      line-height 24px
      text-align center
      font-size $font-size-small-s
      color $color-title-d
      padding 0 10px
      border-1px(#ccc, 12px, solid)

  .song-card-wrap
    margin-top 14px
  .loading-container
    position absolute
    width: 22%
    top 50%
    left 50%
    margin-left -11%
    transform translateY(-50%)
    background-color $color-theme
    padding 6px 0
    border-radius 4px
</style>
