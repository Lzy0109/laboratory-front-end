import request from '@/utils/request'

/**
 * 获取分类信息
 * @param keyword
 * @returns {*}
 */
export function fetchEquipmentCategoryInfos(keyword) {
  return request({
    url: '/api/equipmentCategory/infos',
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
export function fetchEquipmentCategoryInfoById(id) {
  return request({
    url: '/api/equipmentCategory/detail',
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
export function createEquipmentCategoryInfo(data) {
  return request({
    url: '/api/equipmentCategory/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteEquipmentCategoryById(id) {
  return request({
    url: '/api/equipmentCategory/delete',
    // url: '/api/equipmentCategory/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyEquipmentCategoryInfo(data) {
  return request({
    url: '/api/equipmentCategory/modify',
    method: 'PUT',
    data: data
  })
}
