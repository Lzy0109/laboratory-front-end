/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 耗材详情路由
 * @Version: 1.0
 **/
const consumableDetailRouter = {
  path: 'consumable_detail',
  component: () => import('@/views/laboratory_1/consumable/information/consumable-detail'),
  name: 'Consumable_Detail',
  meta: { title: '耗材详情' },
  hidden: true
}

export default consumableDetailRouter
