import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Search = () => import('../pages/Search.vue')
const ProductDetail = () => import('../pages/ProductDetail.vue')
const Placeholder = () => import('../pages/Placeholder.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/search', name: 'search', component: Search },
    { path: '/product/:id', name: 'product-detail', component: ProductDetail, props: true },

    { path: '/publish', component: Placeholder, props: { title: '发闲置' } },
    { path: '/msg', component: Placeholder, props: { title: '消息' } },
    { path: '/app', component: Placeholder, props: { title: 'APP' } },
    { path: '/feedback', component: Placeholder, props: { title: '反馈' } },
    { path: '/service', component: Placeholder, props: { title: '客服' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router




