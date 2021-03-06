/**
 * @Author：李国烨
 * @Create： 2020/7/11
 * @Desc：品牌接口
 * @version: v1.0
 */
import request from '@/utils/request'
/**
 * 获取全部信息
 * @param keyword 查询条件数据
 * @returns {*}
 */
export function fetchBrandInfos(keyword) {
  return request({
    url: '/api/brand/infos',
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
export function fetchBrandInfoById(id) {
  return request({
    // url: '/api/' + id,
    url: '/api/brand/detail',
    method: 'GET',
    params: {
      id: id
    }
  })
}
