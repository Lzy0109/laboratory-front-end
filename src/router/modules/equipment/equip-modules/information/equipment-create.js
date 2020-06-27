// 创建器材
const equipCreateRouter = {
  path: 'equipment_create',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information-create/equipment-create'),
  name: 'Equipment_Create',
  meta: { title: '新增器材' },
  hidden: true
}

export default equipCreateRouter
