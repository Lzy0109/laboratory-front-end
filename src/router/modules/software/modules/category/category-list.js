/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 软件分类管理路由
 * @Version: 1.0
 **/
const softwareCategoryListRouter = {
  path: 'software_category_list',
  component: () => import('@/views/laboratory_1/software/software/category/category-list'),
  name: 'Software_Category_List',
  meta: { title: '软件分类管理' }
}

export default softwareCategoryListRouter
