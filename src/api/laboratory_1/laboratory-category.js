/**
  * @Author：李国烨
  * @Create： 2020/7/14
  * @Desc：实验室分类接口
  * @version: v1.0
 */
import request from '@/utils/request'

/**
 * 获取分类信息
 * @param keyword
 * @returns {*}
 */
export function fetchLaboratoryCategoryInfos(keyword) {
  return request({
    url: '/api/laboratory/category/infos',
    method: 'GET',
    params:{
      keyword
    }
  })
}

/**
 * 根据ID获取分类信息
 * @param id
 * @returns {}
 */
export function fetchLaboratoryCategoryInfoById(id) {
  return request({
    url: '/api/laboratory/category/detail',
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
export function createLaboratoryCategoryInfo(data) {
  return request({
    url: '/api/laboratory/category/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteLaboratoryCategoryById(id) {
  return request({
    url: '/api/laboratory/category/delete',
    // url: '/api/laboratoryCategory/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyLaboratoryCategoryInfo(data) {
  return request({
    url: '/api/laboratory/category/modify',
    method: 'PUT',
    data: data
  })
}
