/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 新建设施分类路由
 * @Version: 1.0
 **/
const facCategoryCreateRouter = {
  path: 'facility_category_create',
  component: () => import('@/views/laboratory_1/field/facility/category-create/category-create'),
  name: 'Facility_Category_Create',
  meta: { title: '新建设施分类' },
  hidden: true
}

export default facCategoryCreateRouter
