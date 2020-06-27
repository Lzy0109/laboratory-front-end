// 设施信息管理
const facilityListRouter = {
  path: 'facility_list',
  component: () => import('@/views/laboratory_1/field/facility/information/facility-list'),
  name: 'Facility_List',
  meta: { title: '设施信息管理' }
}

export default facilityListRouter
