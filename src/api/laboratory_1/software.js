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
     url: '/api/software/infos',
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
      url: '/api/software/detail',
      // url: '/api/api/' + id,
      method: 'GET',
      params: {
        id: id
      }
    })
}

/**
 * 新增一条信息
 * @param data
 * @returns {}
 */
export function createSoftwareInfo(data) {
  return request({
    url: '/api/software/create',
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
      url: '/api/software/delete',
      // url: '/api/api/' + id,
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
      url: '/api/software/modify',
      method: 'PUT',
      data: data
    })
}

