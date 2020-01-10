<template>
  <transition name="slide">
    <div class="disc-wrap">
      <div class="lists-title" ref="header">
        <div class="title-left">
          <span class="cubeic-back" @click="back"></span>
          <i ref="songsTitle">歌单</i>
        </div>
        <div class="title-right">
          <span class="icon-search"></span>
          <span class="icon-beckoning"></span>
        </div>
      </div>
      <cube-sticky :pos="scrollY" :offset="45">
        <cube-scroll ref="scroll"
                     :data="songs"
                     :scroll-events="scrollEvents"
                     :options="scrollOptions"
                     @scroll="scrollHandler">
          <div class="song-lists-desc" :style="bgColor">
            <div class="desc">
              <div class="img-wrap">
                <img v-lazy="playlist.coverImgUrl" alt="">
                <span class="icon-play">{{playlist.playCount | setNum}}</span>
                <i></i>
              </div>
              <div class="songs-lists-txt">
                <h2>{{playlist.name}}</h2>
                <div class="author">
                  <img v-lazy="creator.avatarUrl" alt="">
                  <span class="name">{{creator.nickname}}</span>
                  <span class="cubeic-arrow"></span>
                </div>
                <div class="author-desc">
                  <p>{{playlist.description}}</p>
                  <span class="cubeic-arrow"></span>
                </div>
              </div>
            </div>
            <div class="menu">
              <ul>
                <li>
                  <span class="iconpinglun"></span>
                  <div class="txt">{{playlist.commentCount}}</div>
                </li>
                <li>
                  <span class="cubeic-share"></span>
                  <div class="txt">{{playlist.shareCount}}</div>
                </li>
                <li>
                  <span class="cubeic-add"></span>
                  <div class="txt">下载</div>
                </li>
                <li>
                  <span class="cubeic-square-right"></span>
                  <div class="txt">多选</div>
                </li>
              </ul>
            </div>
          </div>
          <cube-sticky-ele ele-key="2">
            <div class="lists-header" :style="bgColor">
              <div class="sticky-header">
                <div class="left">
                  <span class="icon-play"></span>
                  <div class="play-all">播放全部 <i>(共{{songs.length}}首)</i></div>
                </div>
                <div class="right"><span class="icon-play"></span>收藏 ({{subscribedCount | setNum}})</div>
              </div>
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
  import analyze from 'rgbaster'

  const HEADER_HEIGHT = 45
  export default {
    name: 'disc',
    components: { Loading },
    data () {
      return {
        songs: [],
        playlist: {},
        subscribedCount: 0, // 订阅数
        creator: {}, // 作者信息
        scrollOptions: {
          probeType: 3
          // bounce: false
        },
        scrollEvents: ['scroll'],
        scrollY: 0,
        bgColors: []
      }
    },
    computed: {
      bgColor () {
        // return `background-image: linear-gradient(to bottom right, ${this.bgColors[0]}, ${this.bgColors[1]})`
        return `background-color: ${this.bgColors[0]}`
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
            this.playlist = res.data.playlist
            this.songs = res.data.playlist.tracks
            this.subscribedCount = res.data.playlist.subscribedCount
            this.creator = res.data.playlist.creator
          }
          this.getBgColor()
          console.log('songs:', this.songs)
          console.log('playlist:', res.data.playlist)
          console.log('creator:', res.data.playlist.creator)
        })
      },
      scrollHandler ({ y }) {
        this.scrollY = -y
        let minScrollY = -HEADER_HEIGHT
        let percent = Math.abs(y / minScrollY)
        // 滑过顶部的高度开始变化
        if (y < minScrollY) {
          this.$refs.header.style = this.bgColor
          this.$refs.header.style.opacity = Math.min(1, (percent - 1) / 2)
          this.$refs.songsTitle.innerHTML = this.playlist.name
          this.$refs.songsTitle.style.fontSize = '14px'
        } else {
          this.$refs.header.backgroundColor = ''
          this.$refs.header.style.opacity = 1
          this.$refs.songsTitle.innerHTML = '歌单'
          this.$refs.songsTitle.style.fontSize = 'unset'
        }
      },
      async getBgColor () {
        const result = await analyze(this.playlist.coverImgUrl, {
          ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'],
          scale: 0.6
        })
        let bgColor = [result[0].color, result[1].color]
        this.$nextTick(() => {
          this.bgColors = bgColor
          // console.log(this.bgColors)
        })
      },
      back () {
        this.$router.back()
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
    color $color-white

    .lists-title
      display flex
      justify-content space-between
      /*width 100%*/
      height 45px
      line-height 45px
      padding 0 14px
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 999
      font-size $font-size-large

      i
        font-style normal
        margin-left 12px

      .icon-search
        margin-right 24px

  .cube-sticky
    >>> .cube-sticky-fixed
      top 45px
      background-color: $color-theme

    .desc-bg
      width: 100%
      height: 220px
      padding-top: 45px
      position absolute
      top 0
      left 0
      z-index 98
      filter blur(1px)
      transform scaleX(5)

    .song-lists-desc
      width: 100%
      height: 220px
      padding-top: 45px
      /*background-color: $color-theme*/
      position relative
      z-index 99

      .desc
        display flex
        justify-content space-between
        padding 0 14px

        .img-wrap
          position relative
          width 124px
          height 124px
          overflow hidden
          border-radius 6px

          i
            display block
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            background-color $color-background-back-ss
            z-index 99

          span
            position absolute
            top 4px
            right: 6px;
            color $color-white
            font-size $font-size-small
            z-index 100

          img
            position absolute;
            top 0
            left 0
            bottom 0
            right 0
            margin auto
            width 100%
            height 100%
            max-width 100%
            max-height 100%
            object-fit cover

        .songs-lists-txt
          width 200px

          h2
            font-size $font-size-medium-x
            color $color-white
            line-height: 26px
            font-weight bold

          .author
            display flex
            justify-content flex-start
            padding 4px 0 8px 0

            span
              font-size $font-size-small-s
              color $color-white
              line-height 28px

            .name
              display block
              width 125px
              no-wrap()

          .author-desc
            display flex
            justify-content space-between
            align-items center
            font-size $font-size-small-s
            color $color-theme-d

            p
              width 136px
              line-height 20px
              two-line()

          img
            width 28px
            height 28px
            border-radius 50%
            margin-right: 6px

    >>> .cube-sticky-ele
    >>> .cube-sticky-content
      .sticky-header
        display flex
        justify-content space-between
        padding 10px 14px
        background-color $color-white
        border-top-left-radius 16px
        border-top-right-radius 16px
        overflow hidden

        .left
          display flex
          justify-content space-between
          line-height 36px
          font-size $font-size-medium-x
          color $color-title

          > span
            display block
            width 24px
            text-align center
            line-height 36px

          .play-all
            padding 0 10px

            i
              font-style normal
              font-size $font-size-medium
              color $color-title-s

        .right
          width 104px
          height 36px
          line-height 36px
          text-align center
          border-radius 18px
          background-color $color-theme
          color $color-white

          span
            margin-right 4px

    .menu
      padding 24px 0

      ul
        display flex
        align-items center
        justify-content center
        color $color-white

        li
          flex 1
          text-align center

          span
            font-size $font-size-large-x

          .txt
            font-size $font-size-medium
            padding: 6px 0;

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
    top 80%
    left 50%
    margin-left -11%
    transform translateY(-80%)
    background-color $color-theme
    padding 6px 0
    border-radius 4px
</style>
