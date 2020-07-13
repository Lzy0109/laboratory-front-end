/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 新增零部件路由
 * @Version: 1.0
 **/
const componentsCreateRouter = {
  path: 'components_create',
  component: () => import('@/views/laboratory_1/equipment/components/information-create/information-create'),
  name: 'Components_Create',
  meta: { title: '新增零部件'},
  hidden: true
}

export default componentsCreateRouter
