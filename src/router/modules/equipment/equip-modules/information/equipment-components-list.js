/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 器材内置零部件列表路由
 * @Version: 1.0
 **/
const equipComponentsListRouter = {
  path: 'equip_components_list',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment_components_list'),
  name: 'Equip_Components_List',
  meta: { title: '器材内置零部件列表' },
  hidden: true
}

export default equipComponentsListRouter
