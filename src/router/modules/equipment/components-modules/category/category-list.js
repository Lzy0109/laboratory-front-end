// 零部件分类管理
const componentsCategoryListRouter = {
  path: 'category',
  component: () => import('@/views/laboratory_1/equipment/components/category/category-list'),
  name: 'Category',
  meta: { title: '零部件分类管理' }
}

export default componentsCategoryListRouter
