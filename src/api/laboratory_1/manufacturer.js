/**
  * @Author：李国烨
  * @Create： 2020/7/11
  * @Desc：生产商信息接口
  * @version: v1.0
 */
import request from '@/utils/request'
/**
 * 获取全部信息
 * @param keyword 查询条件数据
 * @returns {*}
 */
export function fetchManufacturerInfos(keyword) {
  return request({
    url: '/api/manufacturer/infos',
    method: 'GET',
    params: {
      keyword
    }
  })
}
/**
 * 根据ID获取信息
 * @param id
 * @returns {}
 */
export function fetchManufacturerInfoById(id) {
  return request({
    // url: 'dev/api/' + id,
    url: '/api/manufacturer/detail',
    method: 'GET',
    params: {
      id: id
    }
  })
}
