/**
 * @Author：李国烨
 * @Create： 2020/7/11
 * @Desc：国码信息接口
 * @version: v1.0
 */
import request from '@/utils/request'
/**
 * 获取全部信息
 * @param query 查询条件数据
 * @returns {*}
 */
export function fetchCountryCodeInfos(keyword) {
  return request({
    url: '/api/countryCode/infos',
    method: 'GET',
    params: {
      keyword: keyword
    }
  })
}
/**
 * 根据ID获取信息
 * @param id
 * @returns {}
 */
export function fetchCountryCodeInfoById(id) {
  return request({
    // url: 'dev/api/' + id,
    url: '/api/countryCode/detail',
    method: 'GET',
    params: {
      id: id
    }
  })
}
