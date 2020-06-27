// 指定实验室内器材列表
const fieldEquipListRouter = {
  path: 'field_equip_list',
  component: () => import('@/views/laboratory_1/field/field/information/field-equip-list'),
  name: 'Field_Equip_List',
  meta: { title: '指定实验室器材列表' },
  hidden: true
}

export default fieldEquipListRouter
