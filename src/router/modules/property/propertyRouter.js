// 实验室资产管理
import propertyListRouter from '@/router/modules/property/modules/information/property-list'
import propertyDetailRouter from '@/router/modules/property/modules/information/property-detail'
import propertyLendRouter from '@/router/modules/property/modules/lend/property-lend'
import propertyReturnRouter from '@/router/modules/property/modules/return/property-return'

const propertyRouter = {
  path: 'property',
    component: () => import('@/views/laboratory_1/property/property/index'),
  name: 'Property',
  meta: { title: '实验室资产管理' },
  children: [
    // 资产分类管理
    // {
    //   path: 'category',
    //   component: () => import('@/views/laboratory_1/property/property/category/index'),
    //   name: 'Category',
    //   meta: { title: '资产分类管理' }
    // },
    // 资产信息管理

    // 资产出借信息管理
    propertyListRouter,
    // 资产出借信息详情
    propertyDetailRouter,
    // 资产出借
    propertyLendRouter,
    // 资产归还
    propertyReturnRouter
    // 资产数量管理
    // {
    //   path: 'quantity',
    //   component: () => import('@/views/laboratory_1/property/property/quantity/index'),
    //   name: 'Quantity',
    //   meta: { title: '资产数量管理' }
    // }
  ]
}

export default propertyRouter
