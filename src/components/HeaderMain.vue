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
   <header>
    <div class="header_main">
      <div class="header-left">
        <router-link to="/">
          <h1>
            <img :src="require('@/assets/img_toy/7efa45d7cb210143d3617da13d5b73bc_t.jpeg')"
              alt="ロゴ" width="120" height="80">
            <span>Raku Raku Toy</span>
          </h1>
        </router-link>
      </div>

      <div class="header-right">
        <nav>
          <ul>
            <li>
              <router-link v-if="store.getters.isLoggedIn === false" to="/toLogin">
                <i class="bi bi-person-circle"></i>
                ログイン
              </router-link>
              <span v-if="store.getters.isLoggedIn === true">
                <span>{{ store.state.user.name }}さんでログイン中</span>
              </span>
            </li>
            <li>
              <router-link v-if="store.getters.isLoggedIn === true" to="/cart">
                <i class="bi bi-cart4"></i>
                カート
              </router-link>
            </li>
            <!-- <li>
              <router-link v-if="store.getters.isLoggedIn === true" to="">
                <i class="bi bi-cart-check"></i>
                購入履歴
              </router-link>
            </li> -->
            <li>
              <button v-if="store.getters.isLoggedIn === true" @click="logout">ログアウト</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>