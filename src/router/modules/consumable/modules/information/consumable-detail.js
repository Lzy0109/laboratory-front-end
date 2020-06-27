// 耗材详情
const consumableDetailRouter = {
  path: 'consumable_detail',
  component: () => import('@/views/laboratory_1/consumable/information/consumable-detail'),
  name: 'Consumable_Detail',
  meta: { title: '耗材详情' },
  hidden: true
}

export default consumableDetailRouter
