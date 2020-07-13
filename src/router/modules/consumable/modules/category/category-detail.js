/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 耗材分类详情路由
 * @Version: 1.0
 **/
const consumableCategoryDetailRouter = {
  path: 'category_detail',
  component: () => import('@/views/laboratory_1/consumable/category/category-detail'),
  name: 'Consumable_Category_Detail',
  meta: { title: '耗材分类详情'},
  hidden: true
}

export default consumableCategoryDetailRouter
