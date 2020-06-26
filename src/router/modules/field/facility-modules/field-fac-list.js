// 指定实验室内设施列表
const fieldFacListRouter = {
  path: 'field_fac_list',
  component: () => import('@/views/laboratory_1/field/field/information/field-fac-list'),
  name: 'Field_Fac_List',
  meta: { title: '指定实验室内设施列表' },
  hidden: true
}
export default fieldFacListRouter
