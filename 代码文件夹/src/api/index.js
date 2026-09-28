import { http } from './http'

// 使用真实后端API
export const api = {
  health: () => http.get('/health').then(res => res.data),
  categories: () => http.get('/api/categories').then(res => res.data),
  tags: () => http.get('/api/tags').then(res => res.data),
  reco: () => http.get('/api/reco').then(res => res.data),
  products: (params) => http.get('/api/products', { params }).then(res => res.data),
  product: (id) => http.get(`/api/products/${id}`).then(res => res.data),
  user: (id) => http.get(`/api/users/${id}`).then(res => res.data),
  sellerProducts: (sellerId) => http.get(`/api/products?sellerId=${sellerId}`).then(res => res.data),
}




