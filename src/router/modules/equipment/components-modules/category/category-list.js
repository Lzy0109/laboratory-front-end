/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 零部件分类管理路由
 * @Version: 1.0
 **/
const componentsCategoryListRouter = {
  path: 'category',
  component: () => import('@/views/laboratory_1/equipment/components/category/category-list'),
  name: 'Components_Category',
  meta: { title: '零部件分类管理' }
}

export default componentsCategoryListRouter
