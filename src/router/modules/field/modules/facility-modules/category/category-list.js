/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 设施分类管理路由
 * @Version: 1.0
 **/
const facCategoryListRouter = {
  path: 'category',
  component: () => import('@/views/laboratory_1/field/facility/category/category-list'),
  name: 'Facility_Category_List',
  meta: { title: '设施分类管理' }
}

export default facCategoryListRouter
