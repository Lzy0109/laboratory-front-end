// 实验室资产管理
const propertyRouter = {
  path: 'property',
    component: () => import('@/views/laboratory_1/property/property/index'),
  name: 'Property',
  meta: { title: '实验室资产管理' },
  children: [
    // 资产分类管理
    {
      path: 'category',
      component: () => import('@/views/laboratory_1/property/property/category/index'),
      name: 'Category',
      meta: { title: '资产分类管理' }
    },
    // 资产信息管理
    {
      path: 'information',
      component: () => import('@/views/laboratory_1/property/property/information/index'),
      name: 'Information',
      meta: { title: '资产信息管理' }
    },
    // 资产数量管理
    {
      path: 'quantity',
      component: () => import('@/views/laboratory_1/property/property/quantity/index'),
      name: 'Quantity',
      meta: { title: '资产数量管理' }
    }
  ]
}

export default propertyRouter
