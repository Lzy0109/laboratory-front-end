// 器材内置零部件详情
const equipComponentsDetailRouter = {
  path: 'equip_components_detail',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment_components_detail'),
  name: 'Equip_Components_Detail',
  meta: { title: '器材内置零部件详情' },
  hidden: true
}

export default equipComponentsDetailRouter
