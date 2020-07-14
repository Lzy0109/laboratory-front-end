/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 创建软件信息路由
 * @Version: 1.0
 **/
const softwareCreateRouter = {
  path: 'software_create',
  component: () => import('@/views/laboratory_1/software/software/information-create/software-create'),
  name: 'Software_Create',
  meta: { title: '新增软件信息' },
  hidden: true
}

export default softwareCreateRouter
