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
    <body>
    <div id="item-all">
      <div class="new-container">
        <!-- <div class="search-message">
          <p th:if="${searchName != null}" th:text="「 + ${searchName} + 」の検索結果"></p>
          <p th:if="${session.searchName != null}" th:text="「 + ${session.searchName} + 」の検索結果"></p>
          <p th:if="${notApplicableMessage != null}" th:text="${notApplicableMessage}" style="color : red"></p>
          <p th:if="${session.count != null}" th:text="${'検索件数：' + session.count + '件'}"></p>
        </div> -->
  
        <!-- ページネーション
        <span th:insert="item.fragment::frag_pagenation"></span> -->
  
        <main>
          <div class="row">
            <div class="itemlist col-md-4 col-sm-6 animate" v-for="item in itemList" :key="item.id">
              <div class="item-image">
                <router-link :to="`/showDetail/${item.id}`">
                  <img :src="require(`@/assets/img_toy/${item.imagePath}`)" width="200" height="200">
                </router-link>
                <!-- <router-link :to="{ name: 'itemDetail', params: { id: String(item.id)}}">
                    <img :src="require(`@/assets/img_toy/${item.imagePath}`)"
                    width="200" height="200">
                </router-link> -->
              </div>
              <div class="item-detail">
                <router-link :to="`/showDetail/${item.id}`">
                  <p class="name">{{ item.name }}</p>
                </router-link>
                <p>{{ item.price }}円</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </body>
</template>