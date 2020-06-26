// 零部件分类详情
const componentsCategoryDetailRouter = {
  path: 'components_category_detail',
  component: () => import('@/views/laboratory_1/equipment/components/category/category-detail'),
  name: 'Components_Category_Detail',
  meta: { title: '零部件分类详情' },
  hidden: true
}

export default componentsCategoryDetailRouter
