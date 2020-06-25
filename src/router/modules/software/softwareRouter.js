// 实验软件管理
import softwareCreateRouter from '@/router/modules/software/modules/software-create'
import softwareDetailRouter from '@/router/modules/software/modules/software-detail'

const softwareRouter = {
  path: 'software',
    component: () => import('@/views/laboratory_1/software/index'),
  name: 'Software',
  meta: { title: '实验软件管理' },
  children: [
    // 实验软件
    {
      path: 'software',
      component: () => import('@/views/laboratory_1/software/software/index'),
      name: 'Software',
      meta: { title: '实验软件' },
      children: [
        // 创建软件信息
        softwareCreateRouter,
        // 软件详细信息
        softwareDetailRouter,
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
          component: () => import('@/views/laboratory_1/software/software/information/software-list'),
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
    // 软件配置区域
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
}

export default softwareRouter
