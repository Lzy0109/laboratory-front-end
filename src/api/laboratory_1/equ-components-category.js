/**
 * @Author：李国烨
 * @Create： 2020/7/14
 * @Desc：器材零部件分类接口
 * @version: v1.0
 */
import request from '@/utils/request'

/**
 * 获取分类信息
 * @param keyword
 * @returns {*}
 */
export function fetchComponentsCategoryInfos(keyword) {
  return request({
    url: '/api/components/category/infos',
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
export function fetchComponentsCategoryInfoById(id) {
  return request({
    url: '/api/components/category/detail',
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
export function createComponentsCategoryInfo(data) {
  return request({
    url: '/api/components/category/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteComponentsCategoryById(id) {
  return request({
    url: '/api/components/category/delete',
    // url: '/api/components/category/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyComponentsCategoryInfo(data) {
  return request({
    url: '/api/components/category/modify',
    method: 'PUT',
    data: data
  })
}
