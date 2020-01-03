<template>
  <div class="song-lists-wrap">
  </div>
</template>

<script>
  import { ERR_OK } from '../../api/config'

  export default {
    name: 'song-lists',
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

<style scoped>

</style>
