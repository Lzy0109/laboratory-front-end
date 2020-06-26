// 软件分类详情
const softwareCategoryDetailRouter = {
  path: 'software_category_detail',
  component: () => import('@/views/laboratory_1/software/software/category/category-detail'),
  name: 'Software_Category_Detail',
  meta: { title: '软件分类详情' },
  hidden: true
}

export default softwareCategoryDetailRouter
