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
    icon: 'svg-name'             the icon show in the sidebar
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
      meta: { title: '后台首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/article',
    component: Layout,
    meta: { title: '文章管理', icon: 'article' },
    children: [
      {
        path: '',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表' }
      }, {
        path: 'add',
        component: () => import('@/views/article/edit'),
        meta: { title: '添加文章' }
      }, {
        path: 'edit/:id',
        component: () => import('@/views/article/edit'),
        hidden: true,
        meta: { title: '编辑文章' }
      }
    ]
  },
  {
    path: '/channel',
    component: Layout,
    meta: { title: '栏目管理', icon: 'tree' },
    children: [
      {
        path: '',
        component: () => import('@/views/channel/list'),
        meta: { title: '栏目管理' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    meta: { title: '辅助管理', icon: 'base' },
    alwaysShow: true,
    children: [
      {
        path: 'author',
        component: () => import('@/views/base/author/list'),
        meta: { title: '作者管理' }
      },
      {
        path: 'origin',
        component: () => import('@/views/base/origin/list'),
        meta: { title: '来源管理' }
      },
      {
        path: 'editor',
        component: () => import('@/views/base/editor/list'),
        meta: { title: '小编管理' }
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
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
