/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 实验室场地详情路由
 * @Version: 1.0
 **/
const fieldDetailRouter = {
  path: 'field_detail',
  component: () => import('@/views/laboratory_1/field/field/information/field-detail'),
  name: 'Field_Detail',
  meta: { title: '实验室详情页' },
  hidden: true
}

export default fieldDetailRouter
