<script setup>
import { ref, onMounted, computed} from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useStore } from 'vuex';

const item = ref([]);
const route = useRoute();
const selectedQuantity = ref('');
const store = useStore();

function keepLogin() {
  const user = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (user && isLoggedIn) {
    store.commit('login', user)
  }
}
keepLogin();

async function addCart() {
    console.log(store.state.user.id)
    await axios.post(`http://localhost:8080/cart/insert?userId=${store.state.user.id}&itemId=${item.value.id}&quantity=${selectedQuantity.value}`);
    router.push({ name: 'cart' });
}

onMounted(async () => {
    await axios.get('http://localhost:8080/showDetail/' + route.params.id)
        .then((response) => (item.value = response.data))
        .catch((error) => console.log(error))
});

const sumPrice = computed(() => {
    return selectedQuantity.value * item.value.price + '円'
})

</script>

<template>
<body>
    <form @submit.prevent="addCart">
        <h2 class="text-2xl font-bold text-center text-gray-800 lg:text-3xl">商品詳細</h2>
        <div class="flex flex-col md:flex-row">
            <div class="w-full">
                <img :src="`/img_toy/${item.imagePath}`">
            </div>
            <div>
                <div class="mb-2 md:mb-3 lg:mb-5">
                    <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl mb-5">商品名：{{ item.name }}</h2>
                    <p class="text-xl font-bold text-gray-800 md:text-2xl">値段：{{ item.price }}円</p>
                </div>
                <div class="mb-2 md:mb-3 lg:mb-5">
                    <div class="mb-2 text-lg font-semibold text-gray-800">商品詳細</div>
                    <p class="text-gray-500">{{ item.description }}</p>
                </div>
                
                <div class="mb-2 md:mb-3 lg:mb-5">
                    <label for="quantity">数量:</label>
                    <span v-if="selectedQuantity > 0">{{ selectedQuantity }}</span>
                    <span v-else>数量を選択してください</span><br>
                    <select v-model="selectedQuantity" name="selectedQuantity"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 h-2 p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled value="数量を選択してください">数量を選択してください</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>
                
                <div class="mb-2 md:mb-3 lg:mb-5">
                    <p class="text-xl font-bold text-gray-800 md:text-2xl">小計：{{ sumPrice }}</p>
                </div>

                <div class="mb-2 md:mb-3 lg:mb-5">
                    <button type="submit" class="block rounded-lg bg-amber-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-amber-600 focus-visible:ring active:bg-amber-700 md:text-base">
                        カートに入れる
                    </button>
                </div>
                
            </div>
        </div>
    </form>
</body>
</template>