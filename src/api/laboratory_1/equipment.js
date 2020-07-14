/**
  * @Author：李国烨
  * @Create： 2020/7/14
  * @Desc：器材信息接口
  * @version: v1.0
 */
import request from '@/utils/request'

/**
 * 获取信息
 * @param keyword
 * @returns {*}
 */
export function fetchEquipmentInfos(keyword) {
  return request({
    url: '/api/equipment/infos',
    method: 'GET',
    params:keyword
  })
}

/**
 * 根据ID获取信息
 * @param id
 * @returns {}
 */
export function fetchEquipmentInfoById(id) {
  return request({
    url: '/api/equipment/detail',
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
export function createEquipmentInfo(data) {
  return request({
    url: '/api/equipment/create',
    method: 'POST',
    data: data
  })
}

/**
 * 根据ID删除信息
 * @param id
 * @returns {}
 */
export function deleteEquipmentById(id) {
  return request({
    url: '/api/equipment/delete',
    // url: '/api/equipment/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改信息
 * @param data
 * @returns {}
 */
export function modifyEquipmentInfo(data) {
  return request({
    url: '/api/equipment/modify',
    method: 'PUT',
    data: data
  })
}
