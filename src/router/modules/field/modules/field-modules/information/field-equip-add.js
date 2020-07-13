/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 为实验室添加器材路由
 * @Version: 1.0
 **/
const fieldEquipAddRouter = {
  path: 'field_equip_add',
  component: () => import('@/views/laboratory_1/field/field/information/field-equip-add'),
  name: 'Field_Equip_Add',
  meta: { title: '为实验室添加器材' },
  hidden: true
}

export default fieldEquipAddRouter
