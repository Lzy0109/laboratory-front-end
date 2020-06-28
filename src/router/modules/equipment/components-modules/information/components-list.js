// 零部件信息管理
const componentsListRouter = {
  path: 'information',
  component: () => import('@/views/laboratory_1/equipment/components/information/components-list'),
  name: 'Components_Information',
  meta: { title: '零部件信息管理' }
}

export default componentsListRouter
