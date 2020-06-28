// 资产出借信息管理
const propertyListRouter = {
  path: 'property_list',
  component: () => import('@/views/laboratory_1/property/property/information/property-list'),
  name: 'Property_List',
  meta: { title: '资产出借信息管理' }
}

export default propertyListRouter
