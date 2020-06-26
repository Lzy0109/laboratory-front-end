// 新增实验室分类
const fieldCategoryCreateRouter = {
  path: 'field_category_create',
  component: () => import('@/views/laboratory_1/field/field/category-create/category-create'),
  name: 'Field_Category_Create',
  meta: { title: '新增实验室分类' },
  hidden: true
}

export default fieldCategoryCreateRouter
