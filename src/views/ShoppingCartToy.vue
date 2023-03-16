<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

const shoppingcartList = ref([]);
const store = useStore();

function keepLogin() {
  const user = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (user && isLoggedIn) {
    store.commit('login', user)
  }
}
keepLogin();

function toItemList() {
  router.push({ name: 'itemList' });
}

async function deleteCartItem(shoppingcartId) {
  await axios.delete(`http://localhost:8080/cart/delete?shoppingcartId=${shoppingcartId}`)
  showShoppingcart();
}

function showShoppingcart() {
  axios.get(`http://localhost:8080/cart/show?userId=${store.state.user.id}`)
        .then((response) => (shoppingcartList.value = response.data))
        .catch((error) => console.log(error))
}

function toOrderConfirm() {
  router.push({ name: 'orderConfirm' })
}

const totalPrice = computed(() => {
  return shoppingcartList.value.reduce((sum, shoppingcart) => sum + shoppingcart.item.price * shoppingcart.quantity, 0).toLocaleString();
})

onMounted(async () => {
    await axios.get(`http://localhost:8080/cart/show?userId=${store.state.user.id}`)
        .then((response) => (shoppingcartList.value = response.data))
        .catch((error) => console.log(error))
})
</script>

<template>
  <h1 class="item-explain-title">ショッピングカート</h1>

  <div v-if="shoppingcartList.length === 0">カートに商品がありません</div>
  <div v-else>
      <form class="cart-items">
        <div v-for="shoppingcart in shoppingcartList" :key="shoppingcart.id">
            <div class="item-pic">
                <router-link :to="`/showDetail/${shoppingcart.itemId}`">
                    <img :src="require(`@/assets/img_toy/${shoppingcart.item.imagePath}`)" alt="商品画像" width="200" height="200">
                    <span>{{ shoppingcart.item.name }}</span>
                </router-link>
            </div>
            <div>値段:{{ shoppingcart.item.price.toLocaleString() }}</div>
            <div>数量:{{ shoppingcart.quantity }}</div>
            <div>合計:{{ (shoppingcart.item.price * shoppingcart.quantity).toLocaleString() }}</div>
            <div>
                <button type="submit" class="btn btn-primary" @click="deleteCartItem(shoppingcart.id)">削除</button>
            </div>
        </div>
      </form>
      <div class="form-group text-center cart-price">
        <p id="total-price">合計金額:{{ totalPrice }}円</p>
      </div>

      <div class="form-group">
        <button @click="toOrderConfirm">注文に進む</button>
        <button @click="toItemList">もう少し買い物を続ける</button>
      </div>
  </div>
</template>