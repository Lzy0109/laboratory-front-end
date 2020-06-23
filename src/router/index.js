import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  /**
   * @author: lzy
   * @date: 2020/6/6
   */
  {
    path: '/laboratory_1',
    component: Layout,
    redirect: '/laboratory_1/field',
    name: 'Laboratory_1',
    meta: {
      title: '实验室模块第一部分',
      icon: 'nested'
    },
    children: [
      // 实验室场地管理
      {
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
                meta: { title: '实验室信息管理' },
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
            path: 'facility',
            component: () => import('@/views/laboratory_1/field/facility/index'),
            name: 'Facility',
            meta: { title: '实验室设施' },
            children: [
              // 设施分类管理
              {
                path: 'category',
                component: () => import('@/views/laboratory_1/field/facility/category/index'),
                name: 'Category',
                meta: { title: '设施分类管理' }
              },
              // 设施信息管理
              {
                path: 'facility-information',
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
      },
      // 创建实验室
      {
        path: 'field_create',
        component: () => import('@/views/laboratory_1/field/field/information/field-create'),
        name: 'Field_Create',
        meta: { title: '新增实验室' },
        hidden: true
      },
      // 实验室场地详情
      {
        path: 'field_detail',
        component: () => import('@/views/laboratory_1/field/field/information/field-detail'),
        name: 'Field_Detail',
        meta: { title: '实验室详情页' },
        hidden: true
      },
      // 指定实验室内设施列表
      {
        path: 'field_fac_list',
        component: () => import('@/views/laboratory_1/field/field/information/field-fac-list'),
        name: 'Field_Fac_List',
        meta: { title: '指定实验室内设施列表' },
        hidden: true
      },
      // 设施详情
      {
        path: 'field_fac_detail',
        component: () => import('@/views/laboratory_1/field/field/information/field-fac-detail'),
        name: 'Field_Fac_Detail',
        meta: { title: '设施详情' },
        hidden: true
      },
      // 指定实验室内器材列表
      {
        path: 'field_equip_list',
        component: () => import('@/views/laboratory_1/field/field/information/field-equip-list'),
        name: 'Field_Equip_List',
        meta: { title: '指定实验室器材列表' },
        hidden: true
      },
      // 器材详情
      {
        path: 'field_equip_detail',
        component: () => import('@/views/laboratory_1/field/field/information/field-equip-detail'),
        name: 'Field_Equip_Detail',
        meta: {title: '器材详情'},
        hidden: true
      },
      // 器材内置软件列表
      {
        path: 'field_equip_sw_list',
        component: () => import('@/views/laboratory_1/field/field/information/field-equip-sw-list'),
        name: 'Field_Equip_Sw_List',
        meta: { title: '器材内置软件列表' },
        hidden: true
      },
      // 软件详情
      {
        path: 'field_equip_sw_detail',
        component: () => import('@/views/laboratory_1/field/field/information/field-equip-sw-detail'),
        name: 'Field_Equip_Sw_Detail',
        meta: { title: '软件详情' },
        hidden: true
      },
      // 实验器材管理
      {
        path: 'equipment',
        component: () => import('@/views/laboratory_1/equipment/index'),
        name: 'Equipment',
        meta: { title: '实验器材管理' },
        children: [
          // 器材信息管理
          {
            path: 'equipment_information',
            component: () => import('@/views/laboratory_1/equipment/equipment_information/index'),
            name: 'Equipment_Information',
            meta: { title: '实验器材' },
            children: [
              {
                path: 'category',
                component: () => import('@/views/laboratory_1/equipment/equipment_information/category/index'),
                name: 'Category',
                meta: { title: '器材分类管理' }
              },
              {
                path: 'information',
                component: () => import('@/views/laboratory_1/equipment/equipment_information/information/index'),
                name: 'Equipment_Information',
                meta: { title: '器材信息管理' }
              },
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
      },
      // 实验软件管理
      {
        path: 'software',
        component: () => import('@/views/laboratory_1/software/index'),
        name: 'Software',
        meta: { title: '实验软件管理' },
        children: [
          {
            path: 'software',
            component: () => import('@/views/laboratory_1/software/software/index'),
            name: 'Software',
            meta: { title: '实验软件' },
            children: [
              // 软件分类管理
              {
                path: 'category',
                component: () => import('@/views/laboratory_1/software/software/category/index'),
                name: 'Category',
                meta: { title: '软件类型管理' }
              },
              // 软件信息管理
              {
                path: 'information',
                component: () => import('@/views/laboratory_1/software/software/information/index'),
                name: 'Information',
                meta: { title: '软件信息管理' }
              },
              // 软件数量管理
              {
                path: 'quantity',
                component: () => import('@/views/laboratory_1/software/software/quantity/index'),
                name: 'Quantity',
                meta: { title: '软件数量管理' }
              }
            ]
          },
          {
            path: 'area',
            component: () => import('@/views/laboratory_1/software/area/index'),
            name: 'Area',
            meta: { title: '配备区域' },
            children: [
              // 软件配备区域信息管理
              {
                path: 'information',
                component: () => import('@/views/laboratory_1/software/area/information/index'),
                name: 'Information',
                meta: { title: '配备区域信息管理' }
              },
              // 软件配备区域使用
              {
                path: 'allocate',
                component: () => import('@/views/laboratory_1/software/area/allocate/index'),
                name: 'Allocate',
                meta: { title: '配备区域' }
              }
            ]
          }
        ]
      },
      // 实验室人员管理
      {
        path: 'personnel',
        component: () => import('@/views/laboratory_1/personnel/index'),
        name: 'Personnel',
        meta: { title: '实验室人员管理' },
        children: [
          // 人员信息管理
          {
            path: 'personnel',
            component: () => import('@/views/laboratory_1/personnel/personnel/index'),
            name: 'Personnel',
            meta: { title: '实验室人员' },
            alwaysShow: true,
            children: [
              {
                path: 'information',
                component: () => import('@/views/laboratory_1/personnel/personnel/information/index'),
                name: 'Information',
                meta: { title: '人员信息管理' }
              }
            ]
          },
          // 人员调度
          {
            path: 'dispatch',
            component: () => import('@/views/laboratory_1/personnel/dispatch/index'),
            name: 'Dispatch',
            meta: { title: '实验室人员调度' }
          }
        ]
      },
      // 实验耗材管理
      {
        path: 'consumable',
        component: () => import('@/views/laboratory_1/consumable/index'),
        name: 'Consumable',
        meta: { title: '实验室耗材管理' },
        children: [
          // 耗材分类管理
          {
            path: 'category',
            component: () => import('@/views/laboratory_1/consumable/category/index'),
            name: 'Category',
            meta: { title: '耗材分类管理' }
          },
          // 耗材信息管理
          {
            path: 'information',
            component: () => import('@/views/laboratory_1/consumable/information/index'),
            name: 'Information',
            meta: { title: '耗材信息管理' }
          },
          // 耗材数量管理
          {
            path: 'quantity',
            component: () => import('@/views/laboratory_1/consumable/quantity/index'),
            name: 'Quantity',
            meta: { title: '耗材数量管理' }
          }
        ]
      },
      // 实验室资产管理
      {
        path: 'property',
        component: () => import('@/views/laboratory_1/property/property/index'),
        name: 'Property',
        meta: { title: '实验室资产管理' },
        children: [
          // 资产分类管理
          {
            path: 'category',
            component: () => import('@/views/laboratory_1/property/property/category/index'),
            name: 'Category',
            meta: { title: '资产分类管理' }
          },
          // 资产信息管理
          {
            path: 'information',
            component: () => import('@/views/laboratory_1/property/property/information/index'),
            name: 'Information',
            meta: { title: '资产信息管理' }
          },
          // 资产数量管理
          {
            path: 'quantity',
            component: () => import('@/views/laboratory_1/property/property/quantity/index'),
            name: 'Quantity',
            meta: { title: '资产数量管理' }
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
