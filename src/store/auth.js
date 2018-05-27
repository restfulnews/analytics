/* eslint-disable no-shadow */
import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

const state = {
  mode: 'login',
  name: null,
  email: null,
  password: null,
  confirmPassword: null,
  loginStatus: false,
  signupStatus: false,
  errorMsg: null,
  jwt: null,
};

const actions = {
  updateAuthMode({ commit }, mode) {
    commit('setAuthMode', mode);
  },
  updateAuthName({ commit }, name) {
    commit('setAuthName', name);
  },
  updateAuthEmail({ commit }, email) {
    commit('setAuthEmail', email);
  },
  updateAuthPassword({ commit }, password) {
    commit('setAuthPassword', password);
  },
  updateAuthConfirmPassword({ commit }, confirmPassword) {
    commit('setAuthConfirmPassword', confirmPassword);
  },
  login({ commit, state }) {
    if (!state.email || !state.password) {
      commit('setAuthLoginStatus', false);
      commit('setErrorMsg', 'Please enter an email & password.');
    } else {
      axios.post(`${process.env.API_URI}/auth`, {
        email: state.email,
        password: state.password,
      }).then((response) => {
        commit('setAuthLoginStatus', true);
        commit('setJwt', response.data.token);
        setCookie('jwt', response.data.token, 30);
        commit('setErrorMsg', null);
      }).catch((error) => {
        commit('setAuthLoginStatus', false);
        commit('setErrorMsg', error.response.data[0].message || error.message);
      });
    }
  },
  signup({ commit, state }) {
    if (!state.name || !state.email || !state.password || !state.confirmPassword) {
      commit('setAuthSignupStatus', false);
      commit('setErrorMsg', 'Please complete the form.');
    } else if (state.password !== state.confirmPassword) {
      commit('setAuthSignupStatus', false);
      commit('setErrorMsg', 'Passwords don\'t match.');
    } else {
      axios.post(`${process.env.API_URI}/users`, {
        name: state.name,
        email: state.email,
        password: state.password,
      }).then((response) => {
        commit('setAuthSignupStatus', true);
        commit('setErrorMsg', null);
        commit('setAuthLoginStatus', true);
        commit('setJwt', response.data.token);
        setCookie('jwt', response.data.token, 30);
      }).catch((error) => {
        commit('setAuthSignupStatus', false);
        commit('setErrorMsg', error.response.data[0].message || error.message);
      });
    }
  },
  checkLogin({ commit }) {
    const jwt = getCookie('jwt');
    if (!jwt) {
      commit('setAuthLoginStatus', false);
    } else {
      console.log('JWT Found!');
      axios.get(`${process.env.API_URI}/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      }).then((response) => {
        commit('setAuthLoginStatus', true);
        commit('setAuthEmail', response.data.email);
        commit('setAuthName', response.data.name);
        commit('setJwt', jwt);
        setCookie('jwt', jwt, 30);
      }).catch((error) => {
        commit('setAuthLoginStatus', false);
        commit('setErrorMsg', error.response.data[0].message || error.message);
      });
      commit('setAuthLoginStatus', true);
    }
  },
  logout({ commit }) {
    commit('setAuthLoginStatus', false);
    deleteCookie('jwt');
  },
};

const mutations = {
  setAuthMode(state, mode) {
    state.mode = mode;
  },
  setAuthName(state, name) {
    state.name = name;
  },
  setAuthEmail(state, email) {
    state.email = email;
  },
  setAuthPassword(state, password) {
    state.password = password;
  },
  setAuthConfirmPassword(state, confirmPassword) {
    state.confirmPassword = confirmPassword;
  },
  setAuthLoginStatus(state, status) {
    state.loginStatus = status;
  },
  setAuthSignupStatus(state, status) {
    state.signupStatus = status;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg;
  },
  setJwt(state, jwt) {
    state.jwt = jwt;
  },
};

const getters = {
  getAuthMode: state => state.mode,
  getAuthErrorMsg: state => state.errorMsg,
  getAuthLoginStatus: state => state.loginStatus,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
