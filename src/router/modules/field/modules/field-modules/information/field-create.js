// 创建实验室
const fieldCreateRouter = {
  path: 'field_create',
  component: () => import('@/views/laboratory_1/field/field/information-create/field-create'),
  name: 'Field_Create',
  meta: { title: '新增实验室' },
  hidden: true
}

export default fieldCreateRouter
