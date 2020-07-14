/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 软件详细信息路由
 * @Version: 1.0
 **/
const softwareDetailRouter = {
  path: 'software_detail',
  component: () => import('@/views/laboratory_1/software/software/information/software-detail'),
  name: 'Software_Detail',
  meta: { title: '软件信息详情' },
  hidden: true
}

export default softwareDetailRouter
