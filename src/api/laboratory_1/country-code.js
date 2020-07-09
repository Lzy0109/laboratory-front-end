import request from '@/utils/request'
/**
 * 获取全部信息
 * @param query 查询条件数据
 * @returns {*}
 */
export function fetchCountryCodeInfos(query) {
  return request({
    url: 'dev/api',
    method: 'GET',
    query: {
      query
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
    url: 'dev/api/' + id,
    method: 'GET'
  })
}
