// 资产出借
const propertyLendRouter = {
  path: 'property_lend',
  component: () => import('@/views/laboratory_1/property/property/lend/property-lend'),
  name: 'Property_Lend',
  meta: { title: '资产出借' }
}

export default propertyLendRouter
