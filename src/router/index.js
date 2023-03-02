import { createRouter, createWebHistory } from 'vue-router'
import ItemList from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'

const routes = [
  {
    path: '/',
    name: 'itemList',
    component: ItemList
  },
  {
    path: '/showDetail/:id',
    name: 'itemDetail',
    component: ItemDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
