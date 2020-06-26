// 实验器材管理
import equipDetailRouter from '@/router/modules/equipment/modules/equipment-detail'
import equipCreateRouter from '@/router/modules/equipment/modules/equipment-create'
import equipSoftwareListRouter from '@/router/modules/equipment/modules/equipment-software-list'
import equipSoftwareDetailRouter from '@/router/modules/equipment/modules/equipment-software-detail'

const equipmentRouter = {
  path: 'modules',
    component: () => import('@/views/laboratory_1/equipment/index'),
  name: 'Equipment',
  meta: { title: '实验器材管理' },
  children: [
    // 实验器材
    {
      path: 'equipment_information',
      component: () => import('@/views/laboratory_1/equipment/equipment_information/index'),
      name: 'Equipment_Information',
      meta: { title: '实验器材' },
      children: [
        // 器材详情
        equipDetailRouter,
        // 新增器材
        equipCreateRouter,
        // 器材内置软件列表
        equipSoftwareListRouter,
        // 器材内置软件详情
        equipSoftwareDetailRouter,
        // 器材种类管理
        {
          path: 'category',
          component: () => import('@/views/laboratory_1/equipment/equipment_information/category/index'),
          name: 'Category',
          meta: { title: '器材分类管理' }
        },
        // 器材信息管理
        {
          path: 'information',
          component: () => import('@/views/laboratory_1/equipment/equipment_information/information/equipment-list'),
          name: 'Equipment_Information',
          meta: { title: '器材信息管理' }
        },
        // 器材数量管理
        {
          path: 'quantity',
          component: () => import('@/views/laboratory_1/equipment/equipment_information/quantity/index'),
          name: 'Quantity',
          meta: { title: '器材数量管理' }
        }
      ]
    },
    // 器材使用(分布)
    {
      path: 'equipment_use',
      component: () => import('@/views/laboratory_1/equipment/equipment_use/index'),
      name: 'Equipment_use-3',
      meta: { title: '器材使用' }
    },
    // 零部件管理
    {
      path: 'components',
      component: () => import('@/views/laboratory_1/equipment/components/index'),
      name: 'Components',
      meta: { title: '器材零部件' },
      children: [
        // 零部件分类管理
        {
          path: 'category',
          component: () => import('@/views/laboratory_1/equipment/components/category/index'),
          name: 'Category',
          meta: { title: '零部件分类管理' }
        },
        // 零部件信息管理
        {
          path: 'information',
          component: () => import('@/views/laboratory_1/equipment/components/information/index'),
          name: 'Information',
          meta: { title: '零部件信息管理' }
        },
        // 零部件数量管理
        {
          path: 'quantity',
          component: () => import('@/views/laboratory_1/equipment/components/quantity/index'),
          name: 'Quantity',
          meta: { title: '零部件数量管理' }
        },
        // 零部件使用(分布)
        {
          path: 'use',
          component: () => import('@/views/laboratory_1/equipment/components/use/index'),
          name: 'Use',
          meta: { title: '零部件使用' }
        }
      ]
    }
  ]
}

export default equipmentRouter
