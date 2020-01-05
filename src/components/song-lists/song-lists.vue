<template>
  <div class="song-lists-wrap">
    <song-card :songList="songList" @select="goSongListDetail"></song-card>
    <div v-show="!songList.length" class="loading-container">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { ERR_OK } from '../../api/config'
  import SongCard from '../../base/song-card/song-card'
  import Loading from '../../base/loading/loading'
  export default {
    name: 'song-lists',
    components: { Loading, SongCard },
    data () {
      return {
        songList: []
      }
    },
    created () {
      // 获取推荐歌单
      this._getRecSongList()
    },
    methods: {
      async _getRecSongList () {
        try {
          const { data } = await this.$api.find.getRecSongList()
          if (data.code === ERR_OK) {
            this.songList = data.playlists
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

<style scoped>

</style>
