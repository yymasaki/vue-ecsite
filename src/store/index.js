import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router';

const rootUrl = 'http://localhost:8080';

export default createStore({
  state: {
    user: null,
    isLoggedIn: false
  },
  getters: {
    isLoggedIn(state) {
      // 二重否定。未定義の変数もif文の条件式の中でboolean型になるため正しく判定ができる(!!について)
      return !!state.isLoggedIn;
    },
    currentUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(`${rootUrl}/login?email=${email}&password=${password}`, { email, password });
        if(response.data !== '') {
          const user = response.data;
          commit('setUser', user);
          commit('setIsLoggedIn', true);
          router.push({ name: 'itemList'});
        } else {
          alert('メールアドレスもしくはパスワードが異なります');
        }
      } catch(error) {
        console.error(error);
        throw new Error('ログインに失敗しました');
      }
    },
    async logout({ commit }) {
      try {
        await axios.post(`${rootUrl}/logout`);
        commit('clearUser');
      } catch(error) {
        console.error(error);
        throw new Error('ログアウトに失敗しました');
      }
    }
  },
  modules: {
  }
})
