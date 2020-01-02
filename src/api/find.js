/**
 * find模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@common/js/http' // 导入http中创建的axios实例

const slider = base.bd + '/banner?type=1' // 请求发现页面轮播图

const find = {
  /**
   * 获取发现页面轮播图
   * @returns {*}
   * @private
   */
  getSlider() {
    return axios.get(slider)
  }
}

export default find
