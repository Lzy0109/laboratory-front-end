// 设施分类管理
const facCategoryListRouter = {
  path: 'category',
  component: () => import('@/views/laboratory_1/field/facility/category/category-list'),
  name: 'Facility_Category_List',
  meta: { title: '设施分类管理' }
}

export default facCategoryListRouter
