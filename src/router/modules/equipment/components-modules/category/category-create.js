// 新增零部件分类
const componentsCategoryCreateRouter = {
  path: 'components_category_create',
  component: () => import('@/views/laboratory_1/equipment/components/category-create/category-create'),
  name: 'Components_Category_Create',
  meta: { title: '新增零部件分类' },
  hidden: true
}

export default componentsCategoryCreateRouter
