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
  <div class="mx-auto max-w-screen-lg px-4 md:px-8">
    <h2 class="text-2xl font-bold text-center text-gray-800 lg:text-3xl mb-6">ショッピングカート</h2>

    <div v-if="shoppingcartList.length === 0">カートに商品がありません</div>
    <div v-else>
      <div class="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
        <div>
          <form class="cart-items">
            <div v-for="shoppingcart in shoppingcartList" :key="shoppingcart.id" class="mb-6 flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6">
                <div>
                    <router-link :to="`/showDetail/${shoppingcart.itemId}`" class="group relative block overflow-hidden h-48 w-32 sm:h-56 sm:w-40">
                        <img :src="require(`@/assets/img_toy/${shoppingcart.item.imagePath}`)" alt="商品画像"
                          class="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110">
                    </router-link>
                </div>

                <div class="flex flex-1 flex-col justify-between py-4">
                  <div>
                    <router-link :to="`/showDetail/${shoppingcart.itemId}`" class="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                      {{ shoppingcart.item.name }}
                    </router-link>
                  </div>
                  <div>
                    <span class="mb-1 block font-bold text-gray-800 md:text-lg">{{ shoppingcart.item.price.toLocaleString() }}円</span>
                  </div>
                </div>

                <div class="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
                  <div class="flex flex-col items-start gap-2">
                    <button type="submit" @click="deleteCartItem(shoppingcart.id)" class="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
                      削除
                    </button>
                  </div>
                  <div class="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16">
                    <span class="block font-bold text-gray-800 md:text-lg">数量:{{ shoppingcart.quantity }}</span>
                  </div>
                  <div class="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16">
                    <span class="block font-bold text-gray-800 md:text-lg">{{ (shoppingcart.item.price * shoppingcart.quantity).toLocaleString() }}円</span>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>

      <div class="flex flex-col items-end gap-4">
        <div class="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
          <span class="text-lg font-bold">合計</span>
          <span class="flex flex-col items-end">
            <span class="text-lg font-bold">{{ totalPrice }}円</span>
          </span>
        </div>
        <button @click="toOrderConfirm" class="block rounded-lg bg-amber-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-amber-600 focus-visible:ring active:bg-amber-700 md:text-base">
          注文に進む
        </button>
        <button @click="toItemList" class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm 
          font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
          もう少し買い物を続ける
        </button>
      </div>
    </div>
  </div>
</template>