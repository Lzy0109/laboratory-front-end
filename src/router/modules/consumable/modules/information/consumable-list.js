// 耗材管理
const consumableListRouter = {
  path: 'consumable_list',
  component: () => import('@/views/laboratory_1/consumable/information/consumable-list'),
  name: 'Consumable_List',
  meta: { title: '耗材信息管理' }
}

export default consumableListRouter
