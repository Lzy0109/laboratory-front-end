/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 器材分类详情路由
 * @Version: 1.0
 **/
const equipCategoryDetailRouter = {
  path: 'equipment_category_detail',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/category/category-detail'),
  name: 'Equipment_Category_Detail',
  meta: { title: '器材分类详情'},
  hidden: true
}

export default equipCategoryDetailRouter
