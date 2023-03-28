<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';


const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const zipcode = ref('');
const address = ref('');
const telephone = ref('');
let msgOfNoMatchPassword = ref('')

function signup() {
    axios.post(`http://localhost:8080/signup?name=${name.value}&email=${email.value}&password=${password.value}&zipcode=${zipcode.value}&address=${address.value}&telephone=${telephone.value}`)
    alert('ユーザー登録が完了しました');
    router.push({ name: 'login'});
}

function checkPassword() {
    if(password.value === confirmPassword.value) {
        msgOfNoMatchPassword = null
    } else {
        msgOfNoMatchPassword = 'パスワードと確認用パスワードが異なります'
    }
}

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

</script>

<template>
  <div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">会員登録画面</h2>
      </div>
      <!-- text - end -->

      <!-- form - start -->
      <form method="post" @submit.prevent="signup" class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
        <div>
          <label for="name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">名前</label>
          <input id="name" name="name" placeholder="山田 太郎" v-model="name" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">メールアドレス</label>
          <input id="email" name="email" placeholder="abc@def.net" v-model="email" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="zipcode" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">郵便番号(ハイフンなし)</label>
          <button type="button" @click="searchAddress" class="rounded-lg bg-slate-400 px-4 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-slate-500 focus-visible:ring active:bg-slate-600 md:text-base">住所検索</button>
          <input id="zipcode" name="zipcode" placeholder="111-1111" v-model="zipcode" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="address" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">住所</label>
          <input id="address" name="address" placeholder="東京都 新宿区" v-model="address" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="telephone" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">電話番号</label>
          <input id="telephone" name="telephone" placeholder="080-0000-0000" v-model="telephone" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="password" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">パスワード</label>
          <input id="password" name="password" v-model="password" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="sm:col-span-2">
          <label for="confirmPassword" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">確認パスワード</label>
          <p>{{ msgOfNoMatchPassword }}</p>
          <input id="confirmPassword" name="confirmPassword" v-model="confirmPassword" @keyup="checkPassword" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
        </div>

        <div class="flex items-center justify-between sm:col-span-2">
          <button type="submit" class="inline-block rounded-lg bg-amber-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-amber-600 focus-visible:ring active:bg-amber-700 md:text-base">登録</button>
        </div>
      </form>
      <!-- form - end -->
    </div>
  </div>
</template>