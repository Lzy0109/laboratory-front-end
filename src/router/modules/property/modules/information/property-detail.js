// 资产出借信息详情
const propertyDetailRouter = {
  path: 'property_detail',
  component: () => import('@/views/laboratory_1/property/property/information/property-detail'),
  name: 'Property_Detail',
  meta: { title: '资产出借信息详情' },
  hidden: true
}

export default propertyDetailRouter
