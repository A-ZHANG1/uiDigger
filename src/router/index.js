import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', 
  component: () => import('@/views/login/index'),
  meta: { title: 'login', 
  icon: 'example' },},
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '账号管理', icon: 'form' }
      }
    ]
  },
  {
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  },
   children: [
    {
      path: 'export-excel',
      component: ()=>import('@/views/excel/exportExcel'),
      name: 'exportExcel',
      meta: { title: 'Excel下载' }
    },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'Excel上传' }
      }
  ]
},
  {
  path: '/charts',
  component: Layout,
  name: 'charts',
  meta: {
    title: 'charts',
    icon: 'chart'
  },
   children: [
    {
      path: 'export-excel',
      component: ()=>import('@/views/charts'),
      name: 'charts',
      meta: { title: '统计图表' }
    }
  ]
},
{
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://tiyuxi.sjtu.edu.cn/',
        meta: { title: '学院首页', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
