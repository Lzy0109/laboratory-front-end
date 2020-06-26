// 创建软件信息
const softwareCreateRouter = {
  path: 'software_create',
    component: () => import('@/views/laboratory_1/software/software/information/software-create'),
  name: 'Software_Create',
  meta: { title: '新增软件信息' },
  hidden: true
}

export default softwareCreateRouter
