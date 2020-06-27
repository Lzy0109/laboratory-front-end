// 软件分类管理
const softwareCategoryListRouter = {
  path: 'software_category_list',
  component: () => import('@/views/laboratory_1/software/software/category/category-list'),
  name: 'Software_Category_List',
  meta: { title: '软件分类管理' }
}

export default softwareCategoryListRouter
