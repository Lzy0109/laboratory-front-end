/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 实验室分类详情路由
 * @Version: 1.0
 **/
const fieldCategoryDetailRouter = {
  path: 'field_category_detail',
  component: () => import('@/views/laboratory_1/field/field/category/category-detail'),
  name: 'Field_Category_Detail',
  meta: { title: '实验室分类详情' },
  hidden: true
}

export default fieldCategoryDetailRouter
