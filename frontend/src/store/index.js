import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: '',
    userName: '',
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getUserId(state) {
      return state.userId;
    },
    getUserName(state) {
      return state.userName;
    },
  },
  mutations: {
    LOGIN(state, payload) {
      state.accessToken = payload['auth-token'];
      state.userId = payload['user-id'];
      state.userName = payload['user-name'];
      localStorage.setItem('key', state.accessToken);
      localStorage.setItem('id', state.userId);
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.userId = '';
      state.userName = '';
      localStorage.removeItem('key');
      localStorage.removeItem('id');
    },
  },
  actions: {
    LOGIN(context, mem) {
      return axios
        .post(`${SERVER_URL}/member/login`, mem)
        .then((response) => {
          context.commit('LOGIN', response.data);
          alert('로그인 성공');
          axios.defaults.headers.common[
            'auth-token'
          ] = `${response.data['auth-token']}`;
        })
        .catch(() => {
          alert('로그인 실패! 아이디 혹은 비밀번호를 다시 입력해주세요');
          this.$router.push('/login');
        });
    },
    LOGOUT(context) {
      context.commit('LOGOUT');
      axios.defaults.headers.common['auth-token'] = undefined;
    },
  },
  modules: {},
});
