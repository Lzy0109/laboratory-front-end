// 实验室分类管理
const fieldCategoryListRouter = {
  path: 'field_category_list',
  component: () => import('@/views/laboratory_1/field/field/category/category-list'),
  name: 'Field_Category_List',
  meta: { title: '实验室分类管理' },
}

export default fieldCategoryListRouter
