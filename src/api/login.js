/**
 * login模块接口列表
 */

import base from './config' // 导入接口域名列表
import axios from '@common/js/http' // 导入http中创建的axios实例

const phoneLogin = base.bd + '/login/cellphone' // 手机号登陆

const login = {
  /**
   * 用户通过手机登录
   * @param phone 手机
   * @param password 密码
   * @returns {*}
   */
  phoneLoginFn (phone, password) {
    return axios.get(phoneLogin, {
      params: {
        phone: phone || '',
        password: password || ''
      }
    })
  }
}

export default login
