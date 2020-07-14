/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 实验室人员管理路由
 * @Version: 1.0
 **/
import personnelListRouter from '@/router/modules/personnel/modules/information/personnel-list'
import personnelDetailRouter from '@/router/modules/personnel/modules/information/personnel-detail'
import personnelDispatchRouter from '@/router/modules/personnel/modules/dispatch/personnel-dispatch'

const personnelRouter = {
  path: 'personnel',
  component: () => import('@/views/laboratory_1/personnel/index'),
  name: 'Personnel',
  meta: { title: '实验室人员管理' },
  children: [
    // 人员信息管理
    {
      path: 'personnel',
      component: () => import('@/views/laboratory_1/personnel/personnel/index'),
      name: '_Personnel',
      meta: { title: '实验室人员' },
      alwaysShow: true,
      children: [
        // 人员信息管理
        personnelListRouter,
        // 人员信息详情
        personnelDetailRouter
      ]
    },
    // 人员调度
    personnelDispatchRouter
  ]
}

export default personnelRouter
