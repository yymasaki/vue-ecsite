import { createRouter, createWebHistory } from 'vue-router'
import ItemList from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Login from '../views/LoginToy.vue'
import SignupUser from '../views/SignupUser.vue'
import ShoppingCartToy from '../views/ShoppingCartToy.vue'

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
  },
  {
    path: '/toLogin',
    name: 'login',
    component: Login
  },
  {
    path: '/toSignup',
    name: 'signup',
    component: SignupUser
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCartToy
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
