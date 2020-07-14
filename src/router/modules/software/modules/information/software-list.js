/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 软件信息管理路由
 * @Version: 1.0
 **/
const softwareListRouter = {
  path: 'information',
  component: () => import('@/views/laboratory_1/software/software/information/software-list'),
  name: 'Software_Information',
  meta: { title: '软件信息管理' }
}

export default softwareListRouter
