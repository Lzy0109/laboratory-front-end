/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 创建耗材分类路由
 * @Version: 1.0
 **/
const consumableCategoryCreateRouter = {
  path: 'consumable_category_create',
  component: () => import('@/views/laboratory_1/consumable/category-create/category-create'),
  name: 'Consumable_Category_Create',
  meta: { title: '新增耗材分类' },
  hidden: true
}

export default consumableCategoryCreateRouter
