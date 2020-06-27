// 新增器材分类
const equipCategoryCreateRouter = {
  path: 'equip_category_create',
  component: () => import('@/views/laboratory_1/equipment/equipment_information/category-create/category-create'),
  name: 'Equip_Category_Create',
  meta: { title: '新增器材分类' },
  hidden: true
}

export default equipCategoryCreateRouter
