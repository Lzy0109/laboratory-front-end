// 新增设施
const facilityCreateRouter = {
  path: 'facility_create',
  component:() => import('@/views/laboratory_1/field/facility/information-create/facility-create'),
  name: 'Facility_Create',
  meta: { title: '新增设施' },
  hidden: true
}

export default facilityCreateRouter
