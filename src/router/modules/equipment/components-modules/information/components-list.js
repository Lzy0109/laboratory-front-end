/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 零部件信息管理路由
 * @Version: 1.0
 **/
const componentsListRouter = {
  path: 'information',
  component: () => import('@/views/laboratory_1/equipment/components/information/components-list'),
  name: 'Components_Information',
  meta: { title: '零部件信息管理' }
}

export default componentsListRouter
