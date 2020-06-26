// 器材分类详情
const equipCategoryDetailRouter = {
  path: 'category_detail',
  component: () => import('@/views/laboratory_1/consumable/category/category-detail'),
  name: 'Category_Detail',
  meta: { title: '器材分类详情'},
  hidden: true
}

export default equipCategoryDetailRouter
