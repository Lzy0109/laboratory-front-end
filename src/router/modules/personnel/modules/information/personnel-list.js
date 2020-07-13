/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 人员信息管理路由
 * @Version: 1.0
 **/
const personnelListRouter = {
  path: 'personnel_list',
  component: () => import('@/views/laboratory_1/personnel/personnel/information/personnel-list'),
  name: 'Personnel_List',
  meta: { title: '人员信息管理' },
}

export default personnelListRouter
