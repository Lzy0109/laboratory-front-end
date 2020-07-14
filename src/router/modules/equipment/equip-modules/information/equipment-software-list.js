/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 器材内置软件列表路由
 * @Version: 1.0
 **/
const equipSoftwareListRouter = {
  path: 'equip_software_list',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment-software-list'),
  name: 'Equip_Software_List',
  meta: { title: '器材内置软件列表' },
  hidden: true
}

export default equipSoftwareListRouter
