// 为实验室添加器材
const fieldEquipAddRouter = {
  path: 'field_equip_add',
  component: () => import('@/views/laboratory_1/field/field/information/field-equip-add'),
  name: 'Field_Equip_Add',
  meta: { title: '为实验室添加器材' },
  hidden: true
}

export default fieldEquipAddRouter
