// 软件信息管理
const softwareListRouter = {
  path: 'information',
  component: () => import('@/views/laboratory_1/software/software/information/software-list'),
  name: 'Software_Information',
  meta: { title: '软件信息管理' }
}

export default softwareListRouter
