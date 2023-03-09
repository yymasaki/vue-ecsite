<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
let errMessage = ref('');

const store = useStore();

const isLoggedIn = computed(() => {
  return store.getters.isLoggedIn;
});

function login() {
  store.dispatch('login', {email: email.value, password: password.value});
  console.log(isLoggedIn);
}
// login();
</script>

<template>
    <div class="login-main">
        <div>
          <div class="well">
            <form method="post" @submit.prevent="login">
              <fieldset>
                <legend>ログイン</legend>
                <div class="alert alert-danger">
                  <p>{{ errMessage }}</p>
                </div>
                <div class="form-group">
                  <!-- <div th:errors="*{email}" style="color:red"></div> -->
                  <label for="inputEmail">メールアドレス:</label>
                  <input type="text" id="inputEmail" name="email" placeholder="Email" v-model="email" />
                </div>
                <div class="form-group">
                  <!-- <div th:errors="*{password}" style="color:red"></div> -->
                  <label for="inputPassword">パスワード:</label>
                  <input type="password" id="inputPassword" name="password" placeholder="Password" v-model="password" />
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">
                    ログイン
                  </button>
                </div>
              </fieldset>
            </form>
          </div>

        </div>

      <div class="row">
        <div class="text-center signup-message">
          <router-link to="/toSignup">ユーザ登録はこちら</router-link>
        </div>
      </div>
    </div>
</template>