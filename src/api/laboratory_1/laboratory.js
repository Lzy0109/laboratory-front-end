/**
  * @Author：李国烨
  * @Create： 2020/7/14
  * @Desc：实验室接口
  * @version: v1.0
 */
import request from '@/utils/request'

/**
 * 获取全部信息
 * @param query 查询条件数据
 * @returns {*}
 */
export function fetchLaboratoryInfos(query) {
  return request({
    url: '/api/laboratory/infos',
    method: 'GET',
    params: query
  })
}

/**
 * 根据ID获取信息
 * @param id
 * @returns {}
 */
export function fetchLaboratoryInfoById(id) {
  return request({
    url: '/api/laboratory/detail',
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
export function createLaboratoryInfo(data) {
  return request({
    url: '/api/laboratory/create',
    method: 'POST',
    data: data
  })
}
/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteLaboratoryInfoById(id) {
  return request({
    url: '/api/laboratory/delete',
    // url: '/api/api/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyLaboratoryInfo(data) {
  return request({
    url: '/api/laboratory/modify',
    method: 'PUT',
    data: data
  })
}

