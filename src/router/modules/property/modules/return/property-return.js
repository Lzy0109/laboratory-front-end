/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 资产归还路由
 * @Version: 1.0
 **/
const propertyReturnRouter = {
  path: 'property_return',
  component: () => import('@/views/laboratory_1/property/property/return/property-return'),
  name: 'Property_Return',
  meta: { title: '资产归还' }
}

export default propertyReturnRouter
