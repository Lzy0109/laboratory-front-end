/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 实验耗材管理路由
 * @Version: 1.0
 **/
import consumableListRouter from '@/router/modules/consumable/modules/information/consumable-list'
import consumableDetailRouter from '@/router/modules/consumable/modules/information/consumable-detail'
import consumableCreateRouter from '@/router/modules/consumable/modules/information/consumable-create'
import consumableCategoryRouter from '@/router/modules/consumable/modules/category/category-list'
import consumableCategoryDetailRouter from '@/router/modules/consumable/modules/category/category-detail'
import consumableCategoryCreateRouter from '@/router/modules/consumable/modules/category/category-create'

const consumableRouter = {
  path: 'consumable',
  component: () => import('@/views/laboratory_1/consumable/index'),
  name: 'Consumable',
  meta: { title: '实验室耗材管理' },
  children: [
    // 创建耗材分类
    consumableCategoryCreateRouter,
    // 耗材分类详情
    consumableCategoryDetailRouter,
    // 耗材分类管理
    consumableCategoryRouter,
    // 创建耗材
    consumableCreateRouter,
    // 耗材详情
    consumableDetailRouter,
    // 耗材信息管理
    consumableListRouter,
    // 耗材数量管理
    // {
    //   path: 'quantity',
    //   component: () => import('@/views/laboratory_1/consumable/quantity/index'),
    //   name: 'Quantity',
    //   meta: { title: '耗材数量管理' }
    // }
  ]
}

export default consumableRouter
