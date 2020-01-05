<template>
  <div class="song-card-wrap" v-show="songList.length">
    <ul>
      <li @click="selectItem(item)" v-for="(item,index) in songList" :key="index">
        <div class="img-wrap"><img alt="" v-lazy="item.coverImgUrl" :key="item.id"></div>
        <div class="desc">{{item.name}}</div>
        <span class="icon-play">&nbsp;{{item.playCount | setPlayCount}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'song-card',
    props: {
      songList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      setPlayCount(val) {
        if (!val) {
          return ''
        }
        if (val > 100000000) {
          val = ((val / 100000000).toFixed(1)) + '亿'
        } else if (val > 10000) {
          val = Math.floor(val / 10000) + '万'
        }
        return val
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/mixin"
  @import "~@common/stylus/variable"
  .song-card-wrap
    overflow: hidden
    ul
      display flex
      justify-content space-between
      flex-wrap wrap
      padding: 0 15px;

      li
        position relative
        margin-bottom 6px

        .img-wrap
          position relative
          width 110px
          height 110px
          overflow hidden
          border-radius 4px

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

        .desc
          color $color-title-d
          font-size $font-size-small-s
          width 110px
          min-height 30px
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          overflow hidden
          line-height 18px
          margin-top: 4px

        span
          position absolute
          top: 4px
          right: 4px
          color $color-white
          font-size $font-size-small-s
</style>
