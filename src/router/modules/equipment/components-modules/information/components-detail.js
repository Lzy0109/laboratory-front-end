/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 零部件详情路由
 * @Version: 1.0
 **/
const componentsDetailRouter = {
  path: 'components_detail',
  component: () => import('@/views/laboratory_1/equipment/components/information/component-detail'),
  name: 'Components_Detail',
  meta: { title: '零部件详情'},
  hidden: true
}

export default componentsDetailRouter
