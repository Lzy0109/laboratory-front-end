import request from '@/utils/request'
/**
 * 获取全部信息
 * @param keyword 查询条件数据
 * @returns {*}
 */
export function fetchModelInfos(keyword) {
  return request({
    url: '/api/model/infos',
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
export function fetchModelInfoById(id) {
  return request({
    // url: 'dev/api/' + id,
    url: '/api/model/detail',
    method: 'GET',
    params: {
     id: id
    }

  })
}
