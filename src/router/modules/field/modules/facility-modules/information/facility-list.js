/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 设施信息管理路由
 * @Version: 1.0
 **/
const facilityListRouter = {
  path: 'facility_list',
  component: () => import('@/views/laboratory_1/field/facility/information/facility-list'),
  name: 'Facility_List',
  meta: { title: '设施信息管理' }
}

export default facilityListRouter
