/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 创建耗材路由
 * @Version: 1.0
 **/
const consumableCreateRouter = {
  path: 'consumable_create',
  component: () => import('@/views/laboratory_1/consumable/information-create/consumable-create'),
  name: 'Consumable_Create',
  meta: { title: '新增耗材' },
  hidden: true
}

export default consumableCreateRouter
