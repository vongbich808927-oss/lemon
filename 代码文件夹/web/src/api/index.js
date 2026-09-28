import { http } from './http'

export const api = {
  health: () => http.get('/health').then(r => r.data),
  categories: () => http.get('/api/categories').then(r => r.data),
  tags: () => http.get('/api/tags').then(r => r.data),
  reco: () => http.get('/api/reco').then(r => r.data),
  products: (params) => http.get('/api/products', { params }).then(r => r.data),
  product: (id) => http.get(`/api/products/${id}`).then(r => r.data),
}




