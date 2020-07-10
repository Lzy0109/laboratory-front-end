import request from '@/utils/request'
/**
 * 获取全部信息
 * @param query 查询条件数据
 * @returns {*}
 */
export function fetchApplicableSystemInfos(keyword) {
  return request({
    url: '/api/applicableSystem/infos',
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
export function fetchApplicableSystemInfoById(id) {
  return request({
    // url: 'dev/api/' + id,
    url: '/api/applicableSystem/detail',
    method: 'GET',
    params:{
      id: id
    }
  })
}
