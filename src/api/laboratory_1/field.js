/**
  * @Author：李国烨
  * @Create： 2020/7/14
  * @Desc：场地信息接口
  * @version: v1.0
 */
import request from '@/utils/request'
/**
 * 获取全部信息
 * @param keyword 查询条件数据
 * @returns {*}
 */
export function fetchFieldInfos(keyword) {
  return request({
    url: '/api/field/infos',
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
export function fetchFieldInfoById(id) {
  return request({
    // url: 'dev/api/' + id,
    url: '/api/field/detail',
    method: 'GET',
    params: {
      id: id
    }
  })
}
