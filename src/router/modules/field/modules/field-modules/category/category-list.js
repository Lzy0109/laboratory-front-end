/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 实验室分类管理路由
 * @Version: 1.0
 **/
const fieldCategoryListRouter = {
  path: 'field_category_list',
  component: () => import('@/views/laboratory_1/field/field/category/category-list'),
  name: 'Field_Category_List',
  meta: { title: '实验室分类管理' },
}

export default fieldCategoryListRouter
