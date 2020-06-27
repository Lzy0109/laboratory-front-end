// 资产归还
const propertyReturnRouter = {
  path: 'property_return',
  component: () => import('@/views/laboratory_1/property/property/return/property-return'),
  name: 'Property_Return',
  meta: { title: '资产归还' }
}

export default propertyReturnRouter
