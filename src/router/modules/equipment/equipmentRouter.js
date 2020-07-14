/**
 * @Author: 刘梓伊
 * @Date: 2020-06-26
 * @Description: 实验器材管理路由
 * @Version: 1.0
 **/
import equipDetailRouter from '@/router/modules/equipment/equip-modules/information/equipment-detail'
import equipCreateRouter from '@/router/modules/equipment/equip-modules/information/equipment-create'
import equipSoftwareListRouter from '@/router/modules/equipment/equip-modules/information/equipment-software-list'
import equipSoftwareDetailRouter from '@/router/modules/equipment/equip-modules/information/equipment-software-detail'
import equipmentListRouter from '@/router/modules/equipment/equip-modules/information/equipment-list'
import equipCategoryListRouter from '@/router/modules/equipment/equip-modules/category/category-list'
import equipCategoryCreateRouter from '@/router/modules/equipment/equip-modules/category/category-create'
import equipCategoryDetailRouter from '@/router/modules/equipment/equip-modules/category/category-detail'
import componentsCategoryListRouter from '@/router/modules/equipment/components-modules/category/category-list'
import componentsListRouter from '@/router/modules/equipment/components-modules/information/components-list'
import componentsCreateRouter from '@/router/modules/equipment/components-modules/information/components-create'
import componentsDetailRouter from '@/router/modules/equipment/components-modules/information/components-detail'
import componentsCategoryCreateRouter from '@/router/modules/equipment/components-modules/category/category-create'
import componentsCategoryDetailRouter from '@/router/modules/equipment/components-modules/category/category-detail'
import equipComponentsListRouter from '@/router/modules/equipment/equip-modules/information/equipment-components-list'
import equipComponentsDetailRouter
  from '@/router/modules/equipment/equip-modules/information/equipment-components-detail'

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
      name: '_Equipment',
      meta: { title: '实验器材' },
      children: [
        // 器材分类管理
        equipCategoryListRouter,
        // 新增器材分类
        equipCategoryCreateRouter,
        // 器材分类详情
        equipCategoryDetailRouter,
        // 器材信息管理
        equipmentListRouter,
        // 新增器材
        equipCreateRouter,
        // 器材详情
        equipDetailRouter,
        // 器材内置零部件列表
        equipComponentsListRouter,
        // 器材内置零部件详情
        equipComponentsDetailRouter,
        // 器材内置软件列表
        equipSoftwareListRouter,
        // 器材内置软件详情
        equipSoftwareDetailRouter,

        // 器材数量管理
        // {
        //   path: 'quantity',
        //   component: () => import('@/views/laboratory_1/equipment/equipment_information/quantity/index'),
        //   name: 'Quantity',
        //   meta: { title: '器材数量管理' }
        // }
      ]
    },
    // 零部件
    {
      path: 'components',
      component: () => import('@/views/laboratory_1/equipment/components/index'),
      name: 'Components',
      meta: { title: '器材零部件' },
      children: [
        // 零部件分类管理
        componentsCategoryListRouter,
        // 新增零部件分类
        componentsCategoryCreateRouter,
        // 零部件分类详情
        componentsCategoryDetailRouter,
        // 零部件信息管理
        componentsListRouter,
        // 新增零部件
        componentsCreateRouter,
        // 零部件详情
        componentsDetailRouter,
        // 零部件数量管理
        // {
        //   path: 'quantity',
        //   component: () => import('@/views/laboratory_1/equipment/components/quantity/index'),
        //   name: 'Quantity',
        //   meta: { title: '零部件数量管理' }
        // },

        // 零部件使用(分布)
        // {
        //   path: 'use',
        //   component: () => import('@/views/laboratory_1/equipment/components/use/index'),
        //   name: 'Use',
        //   meta: { title: '零部件使用' }
        // }
      ]
    }

    // 器材使用(分布)
    // {
    //   path: 'equipment_use',
    //   component: () => import('@/views/laboratory_1/equipment/equipment_use/index'),
    //   name: 'Equipment_use-3',
    //   meta: { title: '器材使用' }
    // },
    // 零部件管理
  ]
}

export default equipmentRouter
