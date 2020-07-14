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
