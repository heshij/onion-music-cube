<template>
  <transition name="slide">
    <div class="disc-wrap">
      <cube-sticky :pos="scrollY">
        <cube-scroll ref="scroll"
                     :data="songs"
                     :scroll-events="scrollEvents"
                     @scroll="scrollHandler">
          <div class="song-lists-desc">
            <!--<div class="test" style="height: 20px;"></div>-->
            <div class="lists-title">
              <div class="title-left">
                <span class="icon-upper"></span>
                <i>歌单</i>
              </div>
              <div class="title-right">
                <span class="icon-search"></span>
                <span class="icon-beckoning"></span>
              </div>
            </div>
          </div>
          <cube-sticky-ele ele-key="2">
            <div class="sticky-header">
              <div class="left"><span class="icon-play"></span>
                <div class="play-all">播放全部 <i>(共{{songs.length}}首)</i></div>
              </div>
              <div class="right"><span class="icon-play"></span>收藏({{subscribedCount | setNum}})</div>
            </div>
          </cube-sticky-ele>
          <div class="songs-lists">
            <ul>
              <li v-for="(item, index) in songs" :key="item.id">
                <span class="num">{{index+1}}</span>
                <div class="txt">
                  <h2>{{item.name}}</h2>
                  <div class="from">
                    <i></i>
                    <i></i>
                    <span>{{item.ar[0].name}} - {{item.al.name}}</span>
                  </div>
                </div>
                <span class="icon-plays playMV"></span>
                <span class="icon-play more"></span>
              </li>
            </ul>
          </div>
        </cube-scroll>
      </cube-sticky>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ERR_OK } from '../../api/config'
  import Loading from '../../base/loading/loading'

  export default {
    name: 'disc',
    components: { Loading },
    data () {
      return {
        songs: [],
        subscribedCount: 0,
        scrollEvents: ['scroll'],
        scrollY: 0
      }
    },
    filters: {
      setNum (val) {
        if (!val) {
          return ''
        }
        if (val > 100000000) {
          val = ((val / 100000000).toFixed(1)) + '亿'
        } else if (val > 10000) {
          val = ((val / 10000).toFixed(1)) + '万'
        }
        return val
      }
    },
    created () {
      this._getInfo()
    },
    methods: {
      _getInfo () {
        let listsId = this.$route.params.id
        this.$api.find.getSongListsDetail(listsId).then((res) => {
          if (res.data.code === ERR_OK) {
            this.songs = res.data.playlist.tracks
            this.subscribedCount = res.data.playlist.subscribedCount
          }
          console.log('songs:', this.songs)
          console.log('playlist:', res.data.playlist)
        })
      },
      scrollHandler ({ y }) {
        this.scrollY = -y
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/mixin"
  @import "~@common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .disc-wrap
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    right 0
    background-color: $color-white
    font-size $font-size-medium
  .cube-sticky
    >>> .cube-sticky-fixed
      top 45px

    .song-lists-desc
      width: 100%
      height: 100px
      background-color: $color-theme
    .lists-title
      display flex
      justify-content space-between
      width 100%
      height 45px
      line-height 45px
      padding 0 14px
      position fixed
      top 0
      left 0
      right 0
      bottom 0
    .sticky-header
      display flex
      justify-content space-between
      padding 10px 14px
      background-color $color-white

      .left
        display flex
        justify-content space-between

    .songs-lists
      /*overflow: hidden*/

      ul
        li
          display flex
          justify-content space-between
          flex-wrap nowrap
          padding 6px 0

          .num
            display block
            width 48px
            text-align center
            color $color-title-s
            line-height 42px

          .txt
            width 250px

            .from
              color $color-title-s
              font-size $font-size-small-s
              no-wrap()

            h2
              color $color-title
              no-wrap()
              padding 8px 0

          .playMV
            width: 40px
            text-align center
            color $color-title-s
            line-height 42px

          .more
            width: 40px
            text-align center
            color $color-title-s
            line-height 42px

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
