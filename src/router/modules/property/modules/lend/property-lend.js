/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 资产出借路由
 * @Version: 1.0
 **/
const propertyLendRouter = {
  path: 'property_lend',
  component: () => import('@/views/laboratory_1/property/property/lend/property-lend'),
  name: 'Property_Lend',
  meta: { title: '资产出借' }
}

export default propertyLendRouter
