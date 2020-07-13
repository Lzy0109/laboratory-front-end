import request from '@/utils/request'

/**
 * 获取分类信息
 * @param keyword
 * @returns {*}
 */
export function fetchSoftwareCategoryInfos(keyword) {
  return request({
    url: '/api/softwareCategory/infos',
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
export function fetchSoftwareCategoryInfoById(id) {
  return request({
    url: '/api/softwareCategory/detail',
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
export function createSoftwareCategoryInfo(data) {
  return request({
    url: '/api/softwareCategory/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteSoftwareCategoryById(id) {
  return request({
    url: '/api/softwareCategory/delete',
    // url: '/api/softwareCategory/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifySoftwareCategoryInfo(data) {
  return request({
    url: '/api/softwareCategory/modify',
    method: 'PUT',
    data: data
  })
}
