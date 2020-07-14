/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 耗材分类信息管理路由
 * @Version: 1.0
 **/
const consumableCategoryRouter = {
  path: 'consumable_category',
  component: () => import('@/views/laboratory_1/consumable/category/category-list'),
  name: 'Consumable_Category',
  meta: { title: '耗材分类管理' }
}

export default consumableCategoryRouter
