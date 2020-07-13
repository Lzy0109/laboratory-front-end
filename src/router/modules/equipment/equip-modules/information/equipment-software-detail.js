/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 器材内置软件详情路由
 * @Version: 1.0
 **/
const equipSoftwareDetailRouter = {
  path: 'equip_software_detail',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment-software-detail'),
  name: 'Equip_Software_Detail',
  meta: { title: '器材内置软件详情' },
  hidden: true
}

export default equipSoftwareDetailRouter
