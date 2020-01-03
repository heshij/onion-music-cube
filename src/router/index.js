import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@components/home/home'
import Find from '@components/find/find'
import Cloud from '@components/cloud/cloud'
import MVideo from '@components/m-video/m-video'
import SongLists from '@components/song-lists/song-lists'
import Disc from '@components/disc/disc'
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
    path: '/m-video',
    name: 'm-video',
    component: MVideo
  },
  {
    path: '/song-lists',
    name: 'song-lists',
    component: SongLists,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
