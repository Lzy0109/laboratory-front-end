// 人员信息详情
const personnelDetailRouter = {
  path: 'personnel_detail',
  component: () => import('@/views/laboratory_1/personnel/personnel/information/personnel-detail'),
  name: 'Personnel_Detail',
  meta: { title: '人员信息详情' },
  hidden: true
}

export default personnelDetailRouter
