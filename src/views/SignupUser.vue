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

</script>

<template>
    <form method="post" @submit.prevent="signup" class="form" th:object="${signupForm}">
        <h1>ユーザー登録画面</h1>
        <div class="signup-item">
            <label>
              名前:<br>
              <input type="text" placeholder="山田 太郎" v-model="name"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              メールアドレス:<br>
              <input type="text" placeholder="abc@def.net" v-model="email"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              郵便番号:<button id="get_address_btn" type="button">住所取得</button><br>
              <input id="zipcode" type="text" placeholder="111-1111" v-model="zipcode"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              住所:<br>
              <input id="address" type="text" placeholder="東京都 新宿区" v-model="address"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              電話番号:<br>
              <input type="text" id="tel" placeholder="080-0000-0000" v-model="telephone"><br>
            </label>
        </div>
        <div class="signup-item">
            <label>
              パスワード:<br>
              <input id="password" type="password" v-model="password"><br>
            </label>
        </div>
        <div class="signup-item">
            <p>{{ msgOfNoMatchPassword }}</p>
            <label>
              確認用パスワード:<br>
              <input type="password" id="confirmPassword" v-model="confirmPassword" @keyup="checkPassword"><br>
            </label>
        </div>
        <button type="reset">クリア</button>
        <button type="submit">登録</button>
    </form>
</template>