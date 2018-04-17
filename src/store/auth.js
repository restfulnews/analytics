/* eslint-disable no-shadow */
import axios from 'axios';

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
        commit('setErrorMsg', null);
      }).catch((error) => {
        commit('setAuthLoginStatus', false);
        commit('setErrorMsg', error.data[0].message);
      });
    }
  },
  signup() {
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
  getErrorMsg: state => state.errorMsg,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
