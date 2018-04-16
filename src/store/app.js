/* eslint-disable no-shadow */

// initial state
const state = {
  title: 'RN Analytics',
};

// getters
const getters = {
  title: state => state.title,
};

// actions
const actions = {
  updateTitle({ commit }, title) {
    commit('setTitle', title);
  },
};

// mutations
const mutations = {
  setTitle(state, title) {
    state.title = title;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
