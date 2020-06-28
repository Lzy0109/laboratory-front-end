// 器材内置软件列表
const equipSoftwareListRouter = {
  path: 'equip_software_list',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment-software-list'),
  name: 'Equip_Software_List',
  meta: { title: '器材内置软件列表' },
  hidden: true
}

export default equipSoftwareListRouter
