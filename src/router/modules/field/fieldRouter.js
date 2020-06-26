// 实验室管理
import fieldCreateRouter from '@/router/modules/field/field-modules/field-create'
import fieldDetailRouter from '@/router/modules/field/field-modules/field-detail'
import fieldFacListRouter from '@/router/modules/field/facility-modules/field-fac-list'
import fieldEquipListRouter from '@/router/modules/field/field-modules/field-equip-list'
import facilityDetailRouter from '@/router/modules/field/facility-modules/facility-detail'
import facilityCreateRouter from '@/router/modules/field/facility-modules/facility-create'

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
      name: 'Field',
      meta: { title: '实验室' },
      children: [
        // 创建实验室
        fieldCreateRouter,
        // 实验室场地详情
        fieldDetailRouter,
        // 指定实验室内设施列表
        fieldFacListRouter,
        // 指定实验室内器材列表
        fieldEquipListRouter,
        // 实验室分类管理
        {
          path: 'category',
          component: () => import('@/views/laboratory_1/field/field/category/index'),
          name: 'Category',
          meta: { title: '实验室分类管理' }
        },
        // 实验室信息管理
        {
          path: 'information',
          component: () => import('@/views/laboratory_1/field/field/information/field-list'),
          name: 'Information',
          meta: { title: '实验室信息管理' }
        },
        // 实验室数量管理
        {
          path: 'quantity',
          component: () => import('@/views/laboratory_1/field/field/quantity/index'),
          name: 'Quantity',
          meta: { title: '实验室数量管理' }
        }
      ]
    },
    // 实验室设施
    {
      path: 'facility-modules',
      component: () => import('@/views/laboratory_1/field/facility/index'),
      name: 'Facility',
      meta: { title: '实验室设施' },
      children: [
        // 设施详情
        facilityDetailRouter,
        // 新增设施
        facilityCreateRouter,
        // 设施分类管理
        {
          path: 'category',
          component: () => import('@/views/laboratory_1/field/facility/category/index'),
          name: 'Category',
          meta: { title: '设施分类管理' }
        },
        // 设施信息管理
        {
          path: 'facility-modules-information',
          component: () => import('@/views/laboratory_1/field/facility/information/facility-list'),
          name: 'Facility-Information',
          meta: { title: '设施信息管理' }
        },
        // 设施数量管理
        {
          path: 'quantity',
          component: () => import('@/views/laboratory_1/field/facility/quantity/index'),
          name: 'Quantity',
          meta: { title: '设施数量管理' }
        }
      ]
    }
  ]
}

export default fieldRouter
