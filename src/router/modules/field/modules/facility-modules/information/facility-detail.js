// 设施详情
const facilityDetailRouter = {
  path: 'facility_detail',
  component: () => import('@/views/laboratory_1/field/facility/information/facility-detail'),
  name: 'Facility_Detail',
  meta: { title: '设施详情' },
  hidden: true
}

export default facilityDetailRouter
