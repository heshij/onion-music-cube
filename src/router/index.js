import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@components/home/home'
import Find from '@components/find/find'
import Cloud from '@components/cloud/cloud'
import Video from '@components/video/video'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/find',
    name: 'find',
    component: Find
  },
  {
    path: '/cloud',
    name: 'cloud',
    component: Cloud
  },
  {
    path: '/video',
    name: 'video',
    component: Video
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
