<template>
  <div class="songs-lists">
    <ul>
      <li v-for="(song, index) in songs" :key="song.id" @click="selectItem(song, index)">
        <span class="num">{{index+1}}</span>
        <div class="txt">
          <h2>{{song.name}}</h2>
          <div class="from">
            <i></i>
            <i></i>
            <span>{{song.ar[0].name}} - {{song.al.name}}</span>
          </div>
        </div>
        <span class="icon-plays playMV"></span>
        <span class="icon-play more"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'song-list',
    props: {
      songs: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@common/stylus/mixin"
  @import "~@common/stylus/variable"
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

</style>
