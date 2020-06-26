// 实验耗材管理
const consumableRouter = {
  path: 'consumable',
    component: () => import('@/views/laboratory_1/consumable/index'),
  name: 'Consumable',
  meta: { title: '实验室耗材管理' },
  children: [
    // 耗材分类管理
    {
      path: 'category',
      component: () => import('@/views/laboratory_1/consumable/category/index'),
      name: 'Category',
      meta: { title: '耗材分类管理' }
    },
    // 耗材信息管理
    {
      path: 'information',
      component: () => import('@/views/laboratory_1/consumable/information/index'),
      name: 'Information',
      meta: { title: '耗材信息管理' }
    },
    // 耗材数量管理
    {
      path: 'quantity',
      component: () => import('@/views/laboratory_1/consumable/quantity/index'),
      name: 'Quantity',
      meta: { title: '耗材数量管理' }
    }
  ]
}

export default consumableRouter
