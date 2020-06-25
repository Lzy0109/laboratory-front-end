// 软件详细信息
const softwareDetailRouter = {
  path: 'software_detail',
    component: () => import('@/views/laboratory_1/software/software/information/software-detail'),
  name: 'Software_Detail',
  meta: { title: '软件信息详情' },
  hidden: true
}

export default softwareDetailRouter
