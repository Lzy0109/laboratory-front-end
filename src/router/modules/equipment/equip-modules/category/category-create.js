/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 新增器材分类路由
 * @Version: 1.0
 **/
const equipCategoryCreateRouter = {
  path: 'equipment_category_create',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/category-create/category-create'),
  name: 'Equipment_Category_Create',
  meta: { title: '新增器材分类' },
  hidden: true
}

export default equipCategoryCreateRouter
