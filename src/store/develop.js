/* eslint-disable no-shadow */
import axios from 'axios';
import fecha from 'fecha';

const state = {
  name: null,
  color: "Blue",
  title: null,
  description: null,
  email: 'example@example.com',
  phone: '0424264910',
  news: [],
  graphs: [],
  previewUrl: null,
  downloadUrl: null,
  status: null,
};

const actions = {
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
  generateWebsite({ commit, state }, payload) {
    const { articles, charts, email } = payload;
    const reformatedArticles = articles.map(article => ({
      title: article.title,
      image: article.thumbnail,
      snippet: article.abstract,
      date: fecha.format(new Date(article.publishedAt), 'dddd MMMM Do, YYYY'),
      link: article.url,
    }));
    const reformatedCharts = charts.map(chart => ({
      name: chart.ticker,
      labels: chart.labels,
      stock: chart.datasets[0].data,
      tweets: chart.datasets[1].data,
    }));
    const hash = Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15);
    commit('setDevelopName', hash);
    commit('setDevelopStatus', 'fetching');
    axios
      .post(`${process.env.ANALYTICS_API_URI}/website?name=${state.name}&user=${email}`,
        {
          title: state.title,
          description: state.description,
          email: state.email,
          pn: state.phone,
          colour: state.color,
          news: reformatedArticles,
          graphs: reformatedCharts,
        },
      )
      .then(() => {
        commit('setDevelopStatus', 'fetched');
        commit('setDevelopPreviewUrl', `${process.env.ANALYTICS_API_URI}/websiteview?name=${state.name}`);
        commit('setDevelopDownloadUrl', `${process.env.ANALYTICS_API_URI}/websitedownload?name=${state.name}`);
      })
      .catch((err) => {
        commit('setDevelopStatus', `error: ${err}`);
      });
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
  setDevelopStatus(state, status) {
    state.status = status;
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
  getDevelopStatus: state => state.status,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
