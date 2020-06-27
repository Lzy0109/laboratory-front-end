// 实验室信息管理
const fieldListRouter = {
  path: 'field_list',
  component: () => import('@/views/laboratory_1/field/field/information/field-list'),
  name: 'Field_List',
  meta: { title: '实验室信息管理' },
}

export default fieldListRouter
