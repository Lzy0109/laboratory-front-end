/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 创建器材路由
 * @Version: 1.0
 **/
const equipCreateRouter = {
  path: 'equipment_create',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information-create/equipment-create'),
  name: 'Equipment_Create',
  meta: { title: '新增器材' },
  hidden: true
}

export default equipCreateRouter
