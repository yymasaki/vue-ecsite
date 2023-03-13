<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

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

async function deleteCartItem(shoppingcartId) {
  await axios.post(`http://localhost:8080/cart/delete?shoppingcartId=${shoppingcartId}`)
  showShoppingcart();
}

function showShoppingcart() {
  axios.get(`http://localhost:8080/cart/show?userId=${store.state.user.id}`)
        .then((response) => (shoppingcartList.value = response.data))
        .catch((error) => console.log(error))
}

onMounted(() => {
    axios.get(`http://localhost:8080/cart/show?userId=${store.state.user.id}`)
        .then((response) => (shoppingcartList.value = response.data))
        .catch((error) => console.log(error))
})
</script>

<template>
  <h1 class="item-explain-title">ショッピングカート</h1>

  <div v-if="shoppingcartList.length === 0">カートに商品がありません</div>
  <div v-else>
      <form th:action="@{/cartInsert/update}" class="cart-items">
        <div v-for="shoppingcart in shoppingcartList" :key="shoppingcart.id">
            <div class="item-pic">
                <router-link :to="`/showDetail/${shoppingcart.itemId}`">
                    <img :src="require(`@/assets/img_toy/${shoppingcart.item.imagePath}`)" alt="商品画像" width="200" height="200">
                    <span>{{ shoppingcart.item.name }}</span>
                </router-link>
            </div>
            <div>値段:{{ shoppingcart.item.price }}</div>
            <div>数量:{{ shoppingcart.quantity }}</div>
            <div>合計:{{ shoppingcart.item.price * shoppingcart.quantity }}</div>
            <div>
                <button type="submit" class="btn btn-primary" @click="deleteCartItem(shoppingcart.id)">削除</button>
            </div>
        </div>
      </form>
      <div class="form-group text-center cart-price">
        <p id="total-price" th:if="${shoppingcartList.size() != 0}"
            th:text="${'ご注文金額合計：' + #numbers.formatInteger(taxInTotal,1,'COMMA') + '円(税込)'}"></p>
      </div>

      <div class="form-group">
        <form th:if="${shoppingcartList.size() != 0}" action="order_confirm.html" th:action="@{/cartInsert/showConfirm}">
          <input class="form-control btn btn-warning btn-block" type="submit" value="注文に進む" />
          <input type="hidden" name="taxInTotal" th:value="${taxInTotal}">
        </form>
        <form action="order_confirm.html" th:action="@{/}">
          <input class="form-control btn btn-warning btn-block" type="submit" value="もう少し買い物を続ける" />
        </form>
      </div>
  </div>
</template>