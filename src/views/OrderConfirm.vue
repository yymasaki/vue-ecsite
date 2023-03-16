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
    <h1>注文確認画面</h1>
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
        <br>
        <div>ご注文合計金額:{{ totalPrice }}</div>
    </div><br>

    <form @submit.prevent="registerOrder">
        <table>
            <tr>
                <td>
                    <div>名前</div>
                </td>
                <td>
                    <input type="text" v-model="name" placeholder="山田太郎">
                </td>
            </tr>
            <tr>
                <td>
                    <div>メールアドレス</div>
                </td>
                <td>
                    <input type="email" v-model="email" placeholder="test@example.com">
                </td>
            </tr>
            <tr>
                <td>
                    <div>郵便番号(ハイフンなし)</div>
                </td>
                <td>
                    <input type="text" v-model="zipcode" placeholder="1111111">
                    <button type="button" @click="searchAddress()">住所検索</button>
                </td>
            </tr>
            <tr>
                <td>
                    <div>住所</div>
                </td>
                <td>
                    <input type="text" v-model="address" placeholder="〇〇県〇〇市〇〇町1-1-1">
                </td>
            </tr>
            <tr>
                <td>
                    <div>電話番号</div>
                </td>
                <td>
                    <input type="tel" v-model="telephone" placeholder="090-1111-2222">
                </td>
            </tr>
            <tr>
                <td>
                    <div>配達日</div>
                </td>
                <td>
                    <label>希望配達日を選択してください
                    <input type="date" id="orderDate" 
                    v-model="orderDate" :min="new Date().toISOString().split('T')[0]"
                    onkeydown="return false"></label>
                </td>
                <p>{{ orderDate }}</p>
            </tr>
            <tr>
                <td>
                    <div>お支払い方法</div>
                </td>
                <td>
                    <label><input type="radio" name="payment" checked="checked" value=1 v-model="payment">代金引換</label>
                    <label><input type="radio" name="payment" value=2 v-model="payment">クレジットカード</label>
                    <p>{{ payment }}</p>
                </td>
            </tr>
        </table>
        <button type="submit">注文する</button>
    </form>
</template>