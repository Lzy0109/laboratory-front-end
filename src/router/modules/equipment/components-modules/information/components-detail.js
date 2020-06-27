// 零部件详情
const componentsDetailRouter = {
  path: 'components_detail',
  component: () => import('@/views/laboratory_1/equipment/components/information/component-detail'),
  name: 'Components_Detail',
  meta: { title: '零部件详情'},
  hidden: true
}

export default componentsDetailRouter
