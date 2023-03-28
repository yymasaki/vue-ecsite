<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex';

const itemList = ref([]);
const store = useStore();
console.log(store.getters.currentUser);
console.log(store.getters.isLoggedIn);

function keepLogin() {
  const user = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (user && isLoggedIn) {
    store.commit('login', user)
  }
}
keepLogin();

onMounted(async () => {
  await axios.get('http://localhost:8080/')
    .then((response) => (itemList.value = response.data))
    .catch((error) => console.log(error))
});

</script>

<template>
  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <h2 class="text-2xl font-bold text-center text-gray-800 lg:text-3xl">商品一覧</h2>
        <!-- <a href="#" class="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">Show more</a> -->
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="item in itemList" :key="item.id">
          <!-- product - start -->
          <div>
            <router-link :to="`/showDetail/${item.id}`" class="group relative mb-2 block h-60 overflow-hidden rounded-lg lg:mb-3">
              <img :src="require(`@/assets/img_toy/${item.imagePath}`)" loading="lazy" alt="Photo by Galina N" class="h-full w-full object-contain object-center transition duration-200 group-hover:scale-110" />
            </router-link>

            <div>
              <router-link :to="`/showDetail/${item.id}`" class="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg">{{ item.name }}</router-link>
              <div class="flex items-end gap-2">
                <span class="font-bold text-gray-800 lg:text-lg">{{ item.price }}円</span>
              </div>
            </div>
          </div>
          <!-- product - end -->
        </div>
      </div>
    </div>
  </div>
</template>