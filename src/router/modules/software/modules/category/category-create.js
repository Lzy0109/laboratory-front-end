// 新建软件分类
const softwareCategoryCreateRouter = {
  path: 'software_category_create',
  component: () => import('@/views/laboratory_1/software/software/information-create/software-create'),
  name: 'Software_Category_Create',
  meta: { title: '新建软件分类' },
  hidden: true
}

export default softwareCategoryCreateRouter
