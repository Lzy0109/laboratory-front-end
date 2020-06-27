// 实验软件管理
import softwareCreateRouter from '@/router/modules/software/modules/information/software-create'
import softwareDetailRouter from '@/router/modules/software/modules/information/software-detail'
import softwareCategoryListRouter from '@/router/modules/software/modules/category/category-list'
import softwareCategoryDetailRouter from '@/router/modules/software/modules/category/category-detail'
import softwareCategoryCreateRouter from '@/router/modules/software/modules/category/category-create'
import softwareListRouter from '@/router/modules/software/modules/information/software-list'

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
        // 软件分类管理
        softwareCategoryListRouter,
        // 软件分类详情
        softwareCategoryDetailRouter,
        // 新建软件分类
        softwareCategoryCreateRouter,
        // 软件信息管理
        softwareListRouter,
        // 创建软件信息
        softwareCreateRouter,
        // 软件详细信息
        softwareDetailRouter,

        // 软件数量管理
        // {
        //   path: 'quantity',
        //   component: () => import('@/views/laboratory_1/software/software/quantity/index'),
        //   name: 'Quantity',
        //   meta: { title: '软件数量管理' }
        // }
      ]
    },
    // 软件配置区域
    // {
    //   path: 'area',
    //   component: () => import('@/views/laboratory_1/software/area/index'),
    //   name: 'Area',
    //   meta: { title: '配备区域' },
    //   children: [
    //     // 软件配备区域信息管理
    //     {
    //       path: 'information',
    //       component: () => import('@/views/laboratory_1/software/area/information/index'),
    //       name: 'Information',
    //       meta: { title: '配备区域信息管理' }
    //     },
    //     // 软件配备区域使用
    //     {
    //       path: 'allocate',
    //       component: () => import('@/views/laboratory_1/software/area/allocate/index'),
    //       name: 'Allocate',
    //       meta: { title: '配备区域' }
    //     }
    //   ]
    // }
  ]
}

export default softwareRouter
