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
      <!-- src/assets/img_toy -->

      <!-- <div class="header-center">
        <form th:action="@{/search}" method="post" class="search-container" th:object="${searchItemsForm}">
          <input type="text" th:field="*{name}" id="name" class="search_name">
          <select th:field="*{status}" id="js-sort" class="orderBy">
            <option th:value="${1}" th:selected="${session.status} == 1">おすすめ順</option>
            <option th:value="${2}" th:selected="${session.status} == 2">安い価格順</option>
            <option th:value="${3}" th:selected="${session.status} == 3">高い価格順</option>
          </select>
          <button type="reset" value="クリア" class="btn">
            <i class="bi bi-trash3"></i>
          </button>
          <button type="submit" value="検索" class="btn">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div> -->

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
              <router-link to="/cart">
                <i class="bi bi-cart4"></i>
                カート
              </router-link>
            </li>
            <li>
              <router-link to="">
                <i class="bi bi-cart-check"></i>
                購入履歴
              </router-link>
            </li>
            <li>
              <button v-if="store.getters.isLoggedIn === true" @click="logout">ログアウト</button>
            </li>
          </ul>

        </nav>

      </div>

    </div>
    <div class="login-name">
      <span th:if="${session.user != null}">
        <span th:text="${'「' + session.user.name + '」さんでログイン中 /'}"></span>
        <span th:text="${' 所有ポイント:' + session.user.point}"></span>
      </span>
    </div>
  </header>
</template>