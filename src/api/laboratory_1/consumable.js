import request from '@/utils/request'

/**
 * 获取信息
 * @param keyword
 * @returns {*}
 */
export function fetchConsumableInfos(keyword) {
  return request({
    url: '/api/Consumable/infos',
    method: 'GET',
    params:{
      keyword: keyword
    }
  })
}

/**
 * 根据ID获取信息
 * @param id
 * @returns {}
 */
export function fetchConsumableInfoById(id) {
  return request({
    url: '/api/Consumable/detail',
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
export function createConsumableInfo(data) {
  return request({
    url: '/api/Consumable/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteConsumableById(id) {
  return request({
    url: '/api/Consumable/delete',
    // url: '/api/Consumable/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyConsumableInfo(data) {
  return request({
    url: '/api/Consumable/modify',
    method: 'PUT',
    data: data
  })
}
