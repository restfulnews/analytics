/* eslint-disable no-shadow */

const state = {
  name: null,
  color: null,
  title: null,
  description: null,
  email: 'example@example.com',
  phone: '0470234523',
  news: [],
  graphs: [],
  previewUrl: null,
  downloadUrl: null,
};

const actions = {
  updateDevelopName({ commit }) {
    // hash this hash
    const hash = `${state.title}-${state.description}`;
    commit('setDevelopName', hash);
  },
  updateDevelopTitle({ commit }, title) {
    commit('setDevelopTitle', title);
  },
  updateDevelopColor({ commit }, color) {
    commit('setDevelopColor', color);
  },
  updateDevelopDescription({ commit }, desc) {
    commit('setDevelopDescription', desc);
  },
  updateDevelopEmail({ commit }, email) {
    commit('setDevelopEmail', email);
  },
  updateDevelopPhone({ commit }, phone) {
    commit('setDevelopPhone', phone);
  },
  updateDevelopNews({ commit }, news) {
    commit('setDevelopNews', news);
  },
  updateDevelopGraphs({ commit }, graphs) {
    commit('setDevelopGraphs', graphs);
  },
  updateDevelopPreviewUrl({ commit }, prevUrl) {
    commit('setDevelopPreviewUrl', prevUrl);
  },
  updateDevelopDownloadUrl({ commit }, downUrl) {
    commit('setDevelopDownloadUrl', downUrl);
  },
};

const mutations = {
  setDevelopName(state, name) {
    state.name = name;
  },
  setDevelopColor(state, color) {
    state.color = color;
  },
  setDevelopTitle(state, title) {
    state.title = title;
  },
  setDevelopDescription(state, description) {
    state.description = description;
  },
  setDevelopEmail(state, email) {
    state.email = email;
  },
  setDevelopPhone(state, phone) {
    state.phone = phone;
  },
  setDevelopNews(state, news) {
    state.news = news;
  },
  setDevelopGraphs(state, graphs) {
    state.graphs = graphs;
  },
  setDevelopPreviewUrl(state, previewUrl) {
    state.previewUrl = previewUrl;
  },
  setDevelopDownloadUrl(state, downloadUrl) {
    state.downloadUrl = downloadUrl;
  },
};

const getters = {
  getDevelopName: state => state.name,
  getDevelopColor: state => state.color,
  getDevelopTitle: state => state.title,
  getDevelopDescription: state => state.description,
  getDevelopEmail: state => state.email,
  getDevelopPhone: state => state.phone,
  getDevelopNews: state => state.news,
  getDevelopGraphs: state => state.graphs,
  getDevelopPreviewUrl: state => state.previewUrl,
  getDevelopDownloadUrl: state => state.downloadUrl,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
