// 器材详情
const equipDetailRouter = {
  path: 'equipment_detail',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment-detail'),
  name: 'Equipment_Detail',
  meta: { title: '器材详情' },
  hidden: true
}

export default equipDetailRouter
