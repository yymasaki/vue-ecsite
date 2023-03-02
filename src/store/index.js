import { createStore } from 'vuex'
import axios from 'axios'


const rootUrl = 'http://localhost:8080';

export default createStore({
  state: {
    user: {
      id: ''
      , name: ''
      , email: ''
      , password: ''
      , zipcode: ''
      , address: ''
      , telephone: ''
      , point: ''
    }
  },
  getters: {
    isLoggedIn(state) {
      // 二重否定。未定義の変数もif文の条件式の中でboolean型になるため、正しく判定ができます(!!について)
      return !!state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`${rootUrl}/login`, credentials);
        const user = response.data;
        commit('serUser', user);
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
