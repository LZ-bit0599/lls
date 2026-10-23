import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/books/BookLayout.vue'),
    redirect: '/books/list',
    meta: { title: '图书管理', requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'BookList',
        component: () => import('../views/books/BookList.vue'),
        meta: { title: '图书列表', requiresAuth: true }
      },
      {
        path: 'detail/:id',
        name: 'BookDetail',
        component: () => import('../views/books/BookDetail.vue'),
        meta: { title: '图书详情', requiresAuth: true }
      },
      {
        path: 'borrow',
        name: 'BookBorrow',
        component: () => import('../views/books/BookBorrow.vue'),
        meta: { title: '借阅记录', requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '404 页面不存在', requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('library_token')

  if (to.meta.requiresAuth && !token) {
    console.warn('[路由守卫] 未登录，跳转登录页 →', to.fullPath)
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  if (to.name === 'Login' && token) {
    next('/')
    return
  }

  if (to.meta.title) {
    document.title = to.meta.title + ' - 图书借阅管理系统'
  }

  next()
})

export default router