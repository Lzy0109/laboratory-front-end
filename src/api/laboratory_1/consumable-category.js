import request from '@/utils/request'

/**
 * 获取分类信息
 * @param keyword
 * @returns {*}
 */
export function fetchConsumableCategoryInfos(keyword) {
  return request({
    url: '/api/consumableCategory/infos',
    method: 'GET',
    params:{
      keyword: keyword
    }
  })
}

/**
 * 根据ID获取分类信息
 * @param id
 * @returns {}
 */
export function fetchConsumableCategoryInfoById(id) {
  return request({
    url: '/api/consumableCategory/detail',
    method: 'GET',
    params: {
      id: id
    }
  })

}

/**
 * 创建分类信息
 * @param data
 * @returns {}
 */
export function createConsumableCategoryInfo(data) {
  return request({
    url: '/api/consumableCategory/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteConsumableCategoryById(id) {
  return request({
    url: '/api/consumableCategory/delete',
    // url: '/api/consumableCategory/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyConsumableCategoryInfo(data) {
  return request({
    url: '/api/consumableCategory/modify',
    method: 'PUT',
    data: data
  })
}
