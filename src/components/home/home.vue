<template>
  <div class="home-wrap">
    网易云首页
  </div>
</template>

<script>
  export default {
    name: 'home',
    created () {
      this._phoneLoginFn()
    },
    methods: {
      _phoneLoginFn () {
        this.$api.login.phoneLoginFn('13025250075', '19234023hj').then(res => {
          console.log(res.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
