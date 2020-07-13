/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 器材详情路由
 * @Version: 1.0
 **/
const equipDetailRouter = {
  path: 'equipment_detail',
  component: () => import('@/views/laboratory_1/field/field/information/field-equip-detail'),
  name: 'Equipment_Detail',
  meta: { title: '器材详情' },
  hidden: true
}

export default equipDetailRouter
