import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../pages/Home.vue')
const ProductDetail = () => import('../pages/ProductDetail.vue')
const Category = () => import('../pages/Category.vue')
const UserProfile = () => import('../pages/UserProfile.vue')
const BuyConfirm = () => import('../pages/BuyConfirm.vue')
const UserOrders = () => import('../pages/UserOrders.vue')
const PublishProduct = () => import('../pages/PublishProduct.vue')
const UserPublished = () => import('../pages/UserPublished.vue')
const Login = () => import('../pages/Login.vue')
const Register = () => import('../pages/Register.vue')
const UserPersonalInfo = () => import('../pages/UserPersonalInfo.vue')
const SellerHome = () => import('../pages/SellerHome.vue')
const Chat = () => import('../pages/Chat.vue')
const Search = () => import('../pages/Search.vue')

// 创建一个简单的购买成功页面组件
const PurchaseSuccess = { 
  template: `
    <div class="wrap">
      <div class="success-container">
        <div class="success-icon">✅</div>
        <div class="success-title">购买成功</div>
        <div class="success-message">您的订单已提交成功</div>
        <button class="view-orders-btn" @click="goToOrders">查看订单</button>
        <button class="continue-shopping-btn" @click="goHome">继续购物</button>
      </div>
    </div>
  `,
  methods: {
    goToOrders() {
      window.open('/orders', '_blank')
      window.close()
    },
    goHome() {
      window.open('/', '_blank')
      window.close()
    }
  },
  styles: `
    .wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .success-container {
      background: #fff;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,.1);
    }
    .success-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
    .success-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }
    .success-message {
      font-size: 16px;
      color: #666;
      margin-bottom: 32px;
    }
    .view-orders-btn,
    .continue-shopping-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      margin: 0 8px;
    }
    .view-orders-btn {
      background: #ff4d00;
      color: #fff;
    }
    .continue-shopping-btn {
      background: #fff;
      color: #333;
      border: 1px solid #d9d9d9;
    }
  `
}

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/product/:id', name: 'productDetail', component: ProductDetail, props: true },
    { path: '/category/:category', name: 'category', component: Category, props: true },
    { path: '/search', name: 'search', component: Search },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/user/profile', name: 'userProfile', component: UserProfile },
    { path: '/user/publish', name: 'publishProduct', component: PublishProduct },
    { path: '/user/published', name: 'userPublished', component: UserPublished },
    { path: '/user/favorites', name: 'userFavorites', component: () => import('../pages/UserFavorites.vue') },
    { path: '/user/bought', name: 'userBought', component: () => import('../pages/UserBought.vue') },
    { path: '/user/sold', name: 'userSold', component: () => import('../pages/UserSold.vue') },
    { path: '/user/personal-info', name: 'userPersonalInfo', component: UserPersonalInfo },
    { path: '/buy/:id', name: 'buyConfirm', component: BuyConfirm, props: true },
    { path: '/orders', name: 'userOrders', component: UserOrders },
    { path: '/purchase-success', name: 'purchaseSuccess', component: PurchaseSuccess },
    { path: '/user/:id', name: 'sellerHome', component: SellerHome, props: true },
    { path: '/chat/:nickname', name: 'chat', component: Chat, props: true }
  ],
})
