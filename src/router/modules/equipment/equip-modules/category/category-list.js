// 器材种类管理
const equipCategoryListRouter = {
  path: 'equipment_category',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/category/category-list'),
  name: 'Equipment_Category',
  meta: { title: '器材分类管理' }
}

export default equipCategoryListRouter
