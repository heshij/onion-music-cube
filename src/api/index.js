/**
 * api接口的统一出口
 */
// 登录模块接口
import login from '@/api/login'
// 发现模块接口
import find from '@/api/find'

// 导出接口
export default {
  login,
  find
}
