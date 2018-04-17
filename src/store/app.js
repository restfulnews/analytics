/* eslint-disable no-shadow */

const state = {
  title: 'RN Analytics',
};

const actions = {
  updateAppTitle({ commit }, title) {
    commit('setAppTitle', title);
  },
};

const mutations = {
  setAppTitle(state, title) {
    state.title = title;
  },
};

const getters = {
  getAppTitle: state => state.title,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
