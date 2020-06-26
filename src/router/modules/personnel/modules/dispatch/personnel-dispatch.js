// 实验室人员调度
const personnelDispatchRouter = {
  path: 'personnel_dispatch',
  component: () => import('@/views/laboratory_1/personnel/dispatch/personnel-dispatch'),
  name: 'Personnel_Dispatch',
  meta: { title: '实验室人员调度' }
}

export default personnelDispatchRouter
