<template>
  <div class="disc-wrap">
    <div class="songs-lists">
      <ul>
        <li v-for="(item, index) in songs" :key="item.id">
          <span>{{index+1}}</span>
          <div class="txt">
            <h2>{{item.name}}</h2>
            <div class="from">
              <i></i>
              <i></i>
              <span>{{item.ar[0].name}}-{{item.al.name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { ERR_OK } from '../../api/config'

  export default {
    name: 'disc',
    data () {
      return {
        songs: []
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
  .disc-wrap
    padding-top 40px
    font-size $font-size-medium
</style>
