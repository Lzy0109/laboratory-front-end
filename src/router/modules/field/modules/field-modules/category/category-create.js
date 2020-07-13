/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 新增实验室分类路由
 * @Version: 1.0
 **/
const fieldCategoryCreateRouter = {
  path: 'field_category_create',
  component: () => import('@/views/laboratory_1/field/field/category-create/category-create'),
  name: 'Field_Category_Create',
  meta: { title: '新增实验室分类' },
  hidden: true
}

export default fieldCategoryCreateRouter
