// 耗材分类信息管理
const consumableCategoryRouter = {
  path: 'consumable_category',
  component: () => import('@/views/laboratory_1/consumable/category/category-list'),
  name: 'Consumable_Category',
  meta: { title: '耗材分类管理' }
}

export default consumableCategoryRouter
