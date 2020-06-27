// 器材信息管理
const equipmentListRouter = {
  path: 'information',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment-list'),
  name: 'Equipment_Information',
  meta: { title: '器材信息管理' }
}

export default equipmentListRouter
