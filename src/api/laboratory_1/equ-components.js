/**
 * @Author：李国烨
 * @Create： 2020/7/14
 * @Desc：器材零部件接口
 * @version: v1.0
 */
import request from '@/utils/request'

/**
 * 获取信息
 * @param keyword
 * @returns {*}
 */
export function fetchComponentsInfos(keyword) {
  return request({
    url: '/api/components/infos',
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
export function fetchComponentsInfoById(id) {
  return request({
    url: '/api/components/detail',
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
export function createComponentsInfo(data) {
  return request({
    url: '/api/components/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteComponentsById(id) {
  return request({
    url: '/api/components/delete',
    // url: '/api/components/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyComponentsInfo(data) {
  return request({
    url: '/api/components/modify',
    method: 'PUT',
    data: data
  })
}
