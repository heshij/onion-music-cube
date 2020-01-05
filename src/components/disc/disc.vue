<template>
  <transition name="slide">
    <div class="disc-wrap">
      <cube-scroll ref="scroll" :data="songs">
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
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getInfo()
    },
    methods: {
      _getInfo() {
        let listsId = this.$route.params.id
        this.$api.find.getSongListsDetail(listsId).then((res) => {
          if (res.data.code === ERR_OK) {
            this.songs = res.data.playlist.tracks
          }
          console.log('songs:', this.songs)
        })
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
