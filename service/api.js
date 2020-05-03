import { request } from '../utils/request.js'
/**
 * 首页随机诗词列表
 */
export function poemListRandom() {
  return request({
    url: `/poemListRandom`
  })
}

/**
 * 搜索诗词
 */
export function search(data) {
  return request({
    url: `/search`,
    method: 'GET',
    data
  })
}

/**
 * 作者列表
 */
export function authorList(data) {
  return request({
    url: `/authorList`,
    method: 'GET',
    data
  })
}

/**
 * 专题
 */
export function tagsByType(data) {
  return request({
    url: `/tagsByType`,
    method: 'GET',
    data
  })
}

/**
 * 诗词详情
 */
export function getById(data) {
  return request({
    url: `/getById`,
    method: 'GET',
    data
  })
}

/**
 * 根据作者获取诗词
 */
export function getPoemsByAuthor(data) {
  return request({
    url: `/getPoemsByAuthor`,
    method: 'GET',
    data
  })
}

/**
 * 根据类型获取诗词
 */
export function poemListByTag(data) {
  return request({
    url: `/poemListByTag`,
    method: 'GET',
    data
  })
}