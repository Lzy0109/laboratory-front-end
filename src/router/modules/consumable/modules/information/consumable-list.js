/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 耗材管理路由
 * @Version: 1.0
 **/
const consumableListRouter = {
  path: 'consumable_list',
  component: () => import('@/views/laboratory_1/consumable/information/consumable-list'),
  name: 'Consumable_List',
  meta: { title: '耗材信息管理' }
}

export default consumableListRouter
