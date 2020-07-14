/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 指定实验室内设施列表路由
 * @Version: 1.0
 **/
const fieldFacListRouter = {
  path: 'field_fac_list',
  component: () => import('@/views/laboratory_1/field/field/information/field-fac-list'),
  name: 'Field_Fac_List',
  meta: { title: '指定实验室内设施列表' },
  hidden: true
}

export default fieldFacListRouter
