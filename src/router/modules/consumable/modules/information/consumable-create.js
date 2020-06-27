// 创建耗材
const consumableCreateRouter = {
  path: 'consumable_create',
  component: () => import('@/views/laboratory_1/consumable/information-create/consumable-create'),
  name: 'Consumable_Create',
  meta: { title: '新增耗材' },
  hidden: true
}

export default consumableCreateRouter
