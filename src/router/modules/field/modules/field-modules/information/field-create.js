/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 创建实验室路由
 * @Version: 1.0
 **/
const fieldCreateRouter = {
  path: 'field_create',
  component: () => import('@/views/laboratory_1/field/field/information-create/field-create'),
  name: 'Field_Create',
  meta: { title: '新增实验室' },
  hidden: true
}

export default fieldCreateRouter
