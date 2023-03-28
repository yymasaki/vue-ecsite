<script setup>
import router from '@/router';
import store from '@/store';

function logout() {
  console.log('logout');
  store.dispatch('logout');
  router.push({ name: 'itemList'});
}
</script>

<template>
  <header class="flex items-center justify-between py-4 md:py-8">
      <!-- logo - start -->
      <router-link to="/" class="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl" aria-label="logo">
        <img width="95" height="94" class="h-auto w-30 h-30 text-indigo-500" :src="require('@/assets/img_toy/7efa45d7cb210143d3617da13d5b73bc_t.jpeg')" />
        楽楽Toy
      </router-link>
      <!-- logo - end -->

      <!-- nav - start -->
      <nav class="hidden gap-12 lg:flex">
        <router-link to="/" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">商品一覧</router-link>
        <router-link to="/cart" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">カート</router-link>
        <router-link to="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">購入履歴</router-link>
        <router-link to="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">マイページ</router-link>
      </nav>
      <!-- nav - end -->

      <!-- buttons - start -->
      <div v-if="store.getters.isLoggedIn === false" class="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
        <router-link to="/toLogin" class="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">ログイン</router-link>

        <router-link to="toSignup" class="inline-block rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base">会員登録</router-link>
      </div>

      <div v-if="store.getters.isLoggedIn === true" class="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
        <button @click="logout" class="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">ログアウト</button>
        <p class="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500">{{ store.state.user.name }}さんでログイン中</p>
      </div>

      <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>

        メニュー
      </button>
      <!-- buttons - end -->
  </header>
</template>