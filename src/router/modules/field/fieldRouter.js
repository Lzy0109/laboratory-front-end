// 实验室管理
import fieldCreateRouter from '@/router/modules/field/modules/field-modules/information/field-create'
import fieldDetailRouter from '@/router/modules/field/modules/field-modules/information/field-detail'
import fieldFacListRouter from '@/router/modules/field/modules/field-modules/information/field-fac-list'
import fieldEquipListRouter from '@/router/modules/field/modules/field-modules/information/field-equip-list'
import facilityDetailRouter from '@/router/modules/field/modules/facility-modules/information/facility-detail'
import facilityCreateRouter from '@/router/modules/field/modules/facility-modules/information/facility-create'
import fieldCategoryListRouter from '@/router/modules/field/modules/field-modules/category/category-list'
import fieldListRouter from '@/router/modules/field/modules/field-modules/information/field-list'
import fieldCategoryCreateRouter from '@/router/modules/field/modules/field-modules/category/category-create'
import fieldCategoryDetailRouter from '@/router/modules/field/modules/field-modules/category/category-detail'
import facCategoryListRouter from '@/router/modules/field/modules/facility-modules/category/category-list'
import facCategoryCreateRouter from '@/router/modules/field/modules/facility-modules/category/category-create'
import facCategoryDetailRouter from '@/router/modules/field/modules/facility-modules/category/category-detail'
import facilityListRouter from '@/router/modules/field/modules/facility-modules/information/facility-list'

const fieldRouter = {
  path: 'field',
  component: () => import('@/views/laboratory_1/field/index'),
  name: 'Field',
  meta: { title: '实验室管理' },
  children: [
    // 实验室
    {
      path: 'field',
      component: () => import('@/views/laboratory_1/field/field/index'),
      name: '_Field',
      meta: { title: '实验室' },
      children: [
        // 实验室分类管理
        fieldCategoryListRouter,
        // 新增实验室分类
        fieldCategoryCreateRouter,
        // 实验室分类详情
        fieldCategoryDetailRouter,
        // 创建实验室
        fieldCreateRouter,
        // 实验室场地信息管理
        fieldListRouter,
        // 实验室场地详情
        fieldDetailRouter,
        // 指定实验室内设施列表
        fieldFacListRouter,
        // 指定实验室内器材列表
        fieldEquipListRouter,

        // 实验室数量管理
        // {
        //   path: 'quantity',
        //   component: () => import('@/views/laboratory_1/field/field/quantity/index'),
        //   name: 'Quantity',
        //   meta: { title: '实验室数量管理' }
        // }
      ]
    },
    // 实验室设施
    {
      path: 'facility-components-modules',
      component: () => import('@/views/laboratory_1/field/facility/index'),
      name: 'Facility',
      meta: { title: '实验室设施' },
      children: [
        // 设施分类管理
        facCategoryListRouter,
        // 新增设施分类
        facCategoryCreateRouter,
        // 设施分类详情
        facCategoryDetailRouter,
        // 设施信息管理
        facilityListRouter,
        // 设施详情
        facilityDetailRouter,
        // 新增设施
        facilityCreateRouter

        // 设施数量管理
        // {
        //   path: 'quantity',
        //   component: () => import('@/views/laboratory_1/field/facility/quantity/index'),
        //   name: 'Quantity',
        //   meta: { title: '设施数量管理' }
        // }
      ]
    }
  ]
}

export default fieldRouter
