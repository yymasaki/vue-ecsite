<script setup>
import router from '@/router';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const shoppingcartList = ref([]);
const store = useStore();
const name = ref('');
const email = ref('');
const zipcode = ref('');
const address = ref('');
const telephone = ref('');
const orderDate = ref('');
const payment = ref(1);

function keepLogin() {
  const user = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (user && isLoggedIn) {
    store.commit('login', user)
  }
}
keepLogin();

async function searchAddress() {
    await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode.value}`)
        .then((response) => {
            if(response.status !== 200) {
                throw new Error('APIがうまく動作していません');
            }
            if(response.data.results === null) {
                alert('住所が見つかりませんでした');
                return;
            }
            const searchAddress = response.data.results[0];
            return address.value = searchAddress.address1 + searchAddress.address2 + searchAddress.address3;
        })
        .catch((error) => console.log(error));
}

function calcTotalPrice() {
    let sum = 0;
    for(let i = 0; shoppingcartList.value.length > i; i++) {
        const shoppingcart = shoppingcartList.value[i];
        sum += shoppingcart.item.price * shoppingcart.quantity;
    }
    return sum;
}

function registerOrder() {
    const sum = calcTotalPrice();
    axios.post(`http://localhost:8080/order/insert`, {destinationName: name.value, destinationEmail: email.value
        , destinationZipcode: zipcode.value, address: address.value, destinationTel: telephone.value, userId: store.state.user.id
        , totalPrice: sum, deliveryTime: orderDate.value, paymentMethod: payment.value});
    router.push({name: 'orderComplete'});
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
    <h2 class="text-2xl font-bold text-center text-gray-800 lg:text-3xl mb-6">注文確認画面</h2>

    <div>
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
      </div>
    </div>
  </div>

  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <form method="post" @submit.prevent="registerOrder" class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
        <div>
          <label for="name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">名前</label>
          <input id="name" name="name" type="text" placeholder="山田 太郎" v-model="name" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">メールアドレス</label>
          <input id="email" name="email" type="email" placeholder="abc@def.com" v-model="email" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="zipcode" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">郵便番号(ハイフンなし)</label>
          <button type="button" @click="searchAddress" class="rounded-lg bg-slate-400 px-4 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-slate-500 focus-visible:ring active:bg-slate-600 md:text-base">住所検索</button>
          <input id="zipcode" name="zipcode" type="text" placeholder="111-1111" v-model="zipcode" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="address" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">住所</label>
          <input id="address" name="address" placeholder="〇〇県〇〇市〇〇町1-1-1" v-model="address" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="telephone" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">電話番号</label>
          <input id="telephone" name="telephone" placeholder="080-1111-2222" v-model="telephone" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="orderDate" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">配達日</label>
          <input id="orderDate" name="orderDate" type="date" v-model="orderDate" :min="new Date().toISOString().split('T')[0]" onkeydown="return false" 
            class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <div lass="mb-2 inline-block text-sm text-gray-800 sm:text-base">お支払い方法</div>
          <label><input type="radio" name="payment" checked="checked" value=1 v-model="payment">代金引換</label>
          <label><input type="radio" name="payment" value=2 v-model="payment" class="ml-4">クレジットカード</label>
        </div>

        <div class="flex items-center justify-between sm:col-span-2">
          <button type="submit" class="inline-block rounded-lg bg-amber-500 px-8 py-3 text-center text-sm font-semibold
           text-white outline-none ring-indigo-300 transition duration-100 hover:bg-amber-600 focus-visible:ring active:bg-amber-700 md:text-base">
           注文する
        </button>
        </div>
      </form>
    </div>
  </div>
</template>