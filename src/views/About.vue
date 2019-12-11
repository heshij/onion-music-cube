<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
  import { getSlider } from '../api/index.js'

  export default {
    data () {
      return {
        undefined
      }
    },
    created () {
      getSlider().then((res) => {
       console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>
