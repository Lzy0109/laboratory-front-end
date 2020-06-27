// 新增零部件
const componentsCreateRouter = {
  path: 'components_create',
  component: () => import('@/views/laboratory_1/equipment/components/information-create/information-create'),
  name: 'Components_Create',
  meta: { title: '新增零部件'},
  hidden: true
}

export default componentsCreateRouter
