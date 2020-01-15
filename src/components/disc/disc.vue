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
                <img v-lazy="playlistS.coverImgUrl" alt="">
                <span class="icon-play">{{playlistS.playCount | setNum}}</span>
                <i></i>
              </div>
              <div class="songs-lists-txt">
                <h2>{{playlistS.name}}</h2>
                <div class="author">
                  <img v-lazy="creator.avatarUrl" alt="">
                  <span class="name">{{creator.nickname}}</span>
                  <span class="cubeic-arrow"></span>
                </div>
                <div class="author-desc">
                  <p>{{playlistS.description}}</p>
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
          <song-list :songs="songs" @select="selectItem"></song-list>
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
  import SongList from '../../base/song-list/song-list'
  import { mapActions, mapGetters } from 'vuex'

  const HEADER_HEIGHT = 45
  export default {
    name: 'disc',
    components: { SongList, Loading },
    data () {
      return {
        songs: [],
        song: [],
        url: '',
        lyric: '',
        nowLyric: '',
        nowLyricIndex: -1,
        ruleLyric: [],
        noLyric: false,
        isShowAudioList: false,
        noLyricText: '',
        playlistS: {},
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
        return `background-image: radial-gradient(${this.bgColors[0]}, ${this.bgColors[1]})`
        // return `background-color: ${this.bgColors[0]}`
      },
      ...mapGetters([
        'playlist'
      ])
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
            this.playlistS = res.data.playlist
            this.songs = res.data.playlist.tracks
            // this.song = this._getSongUrl(res.data.playlist.tracks.id)
            this.subscribedCount = res.data.playlist.subscribedCount
            this.creator = res.data.playlist.creator
          }
          this.getBgColor()
          console.log('songs:', this.songs)
          console.log('playlistS:', res.data.playlist)
          console.log('creator:', res.data.playlist.creator)
          console.log('song:', this.song)
        })
      },
      _getSongUrl (id) {
        this.$api.find.getSongUrl(id).then((res) => {
          const data = res.data
          if (data.code === 200) {
            this.url = data.data[0].url
            console.log(data.data[0])
          }
        })
      },
      _checkSong (id) {
        this.$api.find.checkSong(id).then((res) => {
          const data = res.data
          if (data.success) {
            this._getSongUrl(id)
          }
        })
      },
      _getSongLyric (id) {
        this.$api.find.getSongLyric(id).then((res) => {
          const data = res.data
          if (data.nolyric) {
            // 当前歌曲没有歌词
            this.ruleLyric = []
            this.nowLyric = ''
            this.noLyric = true
            this.noLyricText = '纯音乐，请欣赏'
            return
          }
          this.noLyric = false
          this.lyric = data.lrc.lyric
          if (!this.lyric.trim()) {
            // 歌词为空
            this.noLyricText = '暂时没有歌词'
            this.ruleLyric = []
            this.nowLyric = ''
            this.noLyric = true
            return
          }
          this.ruleLyric = this.createLrcArray(this.lyric)
          console.log('ruleLyric:', this.ruleLyric)
        })
      },
      /**
       * 创建歌词数组
       * 通过换行符分割字符串，形成数组，数组的每一项是一个对象，对象返回格式如下
       * {time：， word：}
       * @param {String} lrc 歌词字符串
       */
      createLrcArray (lrc) {
        const parts = lrc.split('\n')
        for (let index = 0; index < parts.length; index++) {
          const element = parts[index]
          parts[index] = this.changeToObject(element)
        }
        return parts
      },
      /**
       * 根据一行歌词 转换为对象
       * @param {string} str 一行歌词
       */
      changeToObject (str) {
        const words = str.split(']')[1]
        // 这个正则返回时间信息
        const reg = /\w{0,}:\w{0,}.\w{0,}/g
        let timeArray = reg.exec(str)
        if (!timeArray) {
          return
        }
        timeArray = timeArray[0].split(':')
        const minute = parseInt(timeArray[0]) // 分钟数
        const second = parseFloat(timeArray[1]) // 秒数
        const time = minute * 60 + second
        return {
          time,
          words
        }
      },
      scrollHandler ({ y }) {
        this.scrollY = -y
        let minScrollY = -HEADER_HEIGHT
        let percent = Math.abs(y / minScrollY)
        // 滑过顶部的高度开始变化
        if (y < minScrollY) {
          this.$refs.header.style = this.bgColor
          this.$refs.header.style.opacity = Math.min(1, (percent - 1) / 2)
          this.$refs.songsTitle.innerHTML = this.playlistS.name
          this.$refs.songsTitle.style.fontSize = '14px'
        } else {
          this.$refs.header.style = ''
          this.$refs.header.style.opacity = 1
          this.$refs.songsTitle.innerHTML = '歌单'
          this.$refs.songsTitle.style.fontSize = 'unset'
        }
      },
      async getBgColor () {
        const result = await analyze(this.playlistS.coverImgUrl, {
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
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
        this._checkSong(item.id)
        this._getSongLyric(item.id)
        console.log(`select:${index}`, item.id)
      },
      ...mapActions([
        'selectPlay'
      ])
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
