/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 新增设施路由
 * @Version: 1.0
 **/
const facilityCreateRouter = {
  path: 'facility_create',
  component:() => import('@/views/laboratory_1/field/facility/information-create/facility-create'),
  name: 'Facility_Create',
  meta: { title: '新增设施' },
  hidden: true
}

export default facilityCreateRouter
