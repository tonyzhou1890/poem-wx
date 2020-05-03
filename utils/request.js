import { BASE_URL } from './config.js'
/**
 * 普通请求，拦截请求失败（包括 code !== 0）的情况
 * @param {Object} url
 * @param {Object} config
 */
export function request(config) {
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      url: `${BASE_URL}${config.url}`,
      success(res) {
        if (res.data && res.data.code === 0) {
          resolve(res.data)
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          reject(res.data)
        }
      },
      fail(e) {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        })
        reject(e)
      }
    })
  })
}