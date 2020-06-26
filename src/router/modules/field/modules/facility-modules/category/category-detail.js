// 设施分类详情
const facCategoryDetailRouter = {
  path: 'facility_category_detail',
  component: () => import('@/views/laboratory_1/field/facility/category/category-detail'),
  name: 'Facility_Category_Detail',
  meta: { title: '设施分类详情' },
  hidden: true
}

export default facCategoryDetailRouter
