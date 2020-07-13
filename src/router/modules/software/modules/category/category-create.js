/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 新建软件分类路由
 * @Version: 1.0
 **/
const softwareCategoryCreateRouter = {
  path: 'software_category_create',
  component: () => import('@/views/laboratory_1/software/software/category-create/category-create'),
  name: 'Software_Category_Create',
  meta: { title: '新建软件分类' },
  hidden: true
}

export default softwareCategoryCreateRouter
