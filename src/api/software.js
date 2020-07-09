/**
 * 软件管理相关接口
 * */
import request from '@/utils/request'

/**
 * 获取全部信息
 * @param query 查询条件数据
 * @returns {*}
 */
export function fetchSoftwareInfos(query) {
   return request({
     url: 'dev/api',
     method: 'GET',
     query: {
       query
     }
   })
}

/**
 * 根据ID获取信息
 * @param id
 * @returns {}
 */
export function fetchSoftwareInfoById(id) {
    return request({
      url: 'dev/api/' + id,
      method: 'GET'
    })
}

/**
 * 新增一条信息
 * @param data
 * @returns {AxiosPromise}
 */
export function createSoftwareInfo(data) {
  return request({
    url: 'dev/api',
    method: 'POST',
    data: data
  })
}
/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteSoftwareInfoById(id) {
    return request({
      url: 'dev/api/' + id,
      method: 'DELETE'
    })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifySoftwareInfo(data) {
    return request({
      url: 'dev/api',
      method: 'PUT',
      data: data
    })
}

/**
 * 获取分类信息
 * @param query
 * @returns {*}
 */
export function fetchSoftwareCategoryInfos(query) {
    return request({
      url: 'dev/api',
      method: 'GET',
      query: {
        query
      }
    })
}

/**
 * 根据ID获取分类信息
 * @param id
 * @returns {AxiosPromise}
 */
export function fetchSoftwareCategoryInfoById(id) {
  return request({
    url: 'dev/api/' + id,
    method: 'GET',
  })

}

/**
 * 创建分类信息
 * @param data
 * @returns {AxiosPromise}
 */
export function createSoftwareCategoryInfo(data) {
  return request({
    url: 'dev/api',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteSoftwareCategoryById(id) {
  return request({
    url: 'dev/api/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {AxiosPromise}
 */
export function modifySoftwareCategoryInfo(data) {
  return request({
    url: 'dev/api',
    method: 'PUT',
    data: data
  })
}
