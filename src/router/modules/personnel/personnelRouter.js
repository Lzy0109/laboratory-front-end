// 实验室人员管理
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
      name: 'Personnel',
      meta: { title: '实验室人员' },
      alwaysShow: true,
      children: [
        {
          path: 'information',
          component: () => import('@/views/laboratory_1/personnel/personnel/information/index'),
          name: 'Information',
          meta: { title: '人员信息管理' }
        }
      ]
    },
    // 人员调度
    {
      path: 'dispatch',
      component: () => import('@/views/laboratory_1/personnel/dispatch/index'),
      name: 'Dispatch',
      meta: { title: '实验室人员调度' }
    }
  ]
}

export default personnelRouter
