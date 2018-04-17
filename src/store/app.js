/* eslint-disable no-shadow */

const state = {
  title: 'RN Analytics',
};

const getters = {
  getAppTitle: state => state.title,
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

export default {
  state,
  getters,
  actions,
  mutations,
};
