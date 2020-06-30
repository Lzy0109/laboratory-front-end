// 器材详情
const equipDetailRouter = {
  path: 'equipment_detail',
  component: () => import('@/views/laboratory_1/field/field/information/field-equip-detail'),
  name: 'Equipment_Detail',
  meta: { title: '器材详情' },
  hidden: true
}

export default equipDetailRouter
