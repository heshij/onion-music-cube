/**
 * find模块接口列表
 */

import base from './config' // 导入接口域名列表
import axios from '@common/js/http' // 导入http中创建的axios实例

const api = base.bd // 本地请求

const slider = api + '/banner?type=1' // 请求发现页面轮播图
const recSongList = api + '/top/playlist' // 推荐歌单，歌单广场
const songListsDetail = api + '/playlist/detail' // 获取歌单详情

const find = {
  /**
   * 调用此接口 , 获取发现页面轮播图
   * @returns {*}
   * @private
   */
  getSlider () {
    return axios.get(slider)
  },
  /**
   * 调用此接口 , 可获取网友精选碟歌单
   * @param limit
   * @param order 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
   * @param cat  tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
   * @returns {*}
   */
  getRecSongList (limit = 30, order = 'hot', cat) {
    return axios.get(recSongList, {
      params: {
        limit,
        order,
        cat
      }
    })
  },
  /**
   * 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
   * @param id 歌单 id
   * @param s 歌单最近的 s 个收藏者
   * @returns {*}
   */
  getSongListsDetail (id, s = 5) {
    return axios.get(songListsDetail, {
      params: {
        id,
        s
      }
    })
  }
}

export default find
