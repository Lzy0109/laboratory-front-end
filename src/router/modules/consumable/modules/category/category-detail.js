// 耗材分类详情
const consumableCategoryDetailRouter = {
  path: 'category_detail',
  component: () => import('@/views/laboratory_1/consumable/category/category-detail'),
  name: 'Category_Detail',
  meta: { title: '耗材分类详情'},
  hidden: true
}

export default consumableCategoryDetailRouter
