// 创建耗材分类
const consumableCategoryCreateRouter = {
  path: 'consumable_category_create',
  component: () => import('@/views/laboratory_1/consumable/category-create/category-create'),
  name: 'Consumable_Category_Create',
  meta: { title: '新增耗材分类' },
  hidden: true
}

export default consumableCategoryCreateRouter
