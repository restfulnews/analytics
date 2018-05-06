/* eslint-disable no-shadow */
import http from '../utils/http';

const state = {
  startTime: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
  endTime: new Date(),
  keywords: ['Plastic', 'Bags'],
  tickers: ['Woolworths', 'WES'],
  results: [],
  status: null,
  meta: null,
};

const actions = {
  updateSearchStartTime({ commit }, time) {
    commit('setSearchStartTime', time);
  },
  updateSearchEndTime({ commit }, time) {
    commit('setSearchEndTime', time);
  },
  updateSearchKeywords({ commit }, keywords) {
    commit('setSearchKeywords', keywords);
  },
  updateSearchTickers({ commit }, tickers) {
    commit('setSearchTickers', tickers);
  },
  updateSearchResults({ commit, state }) {
    const startTime = state.startTime.toISOString();
    const endTime = state.endTime.toISOString();
    const tickers = state.tickers.join();
    const keywords = state.keywords.join();
    const url = `/search?topics=${keywords}&start_date=${startTime}&end_date=${endTime}&companyids=${tickers}`;
    commit('setSearchStatus', 'fetching');
    commit('setSearchMeta', null);
    http.get(url)
      .then((response) => {
        commit('setSearchResults', response.data.data);
        commit('setSearchStatus', 'fetched');
        commit('setSearchMeta', {
          elapsedTime: response.data.elapsedTime,
          companies: response.data.companies,
        });
      })
      .catch((error) => {
        commit('setSearchStatus', `failed: ${error.status}`);
      });
  },
};

const mutations = {
  setSearchStartTime(state, time) {
    state.startTime = time;
  },
  setSearchEndTime(state, time) {
    state.endTime = time;
  },
  setSearchKeywords(state, keywords) {
    state.keywords = keywords;
  },
  setSearchTickers(state, tickers) {
    state.tickers = tickers;
  },
  setSearchResults(state, results) {
    state.results = results;
  },
  setSearchStatus(state, status) {
    state.status = status;
  },
  setSearchMeta(state, meta) {
    state.meta = meta;
  },
};

const getters = {
  getSearchStartTime: state => state.startTime,
  getSearchEndTime: state => state.endTime,
  getSearchKeywords: state => state.keywords,
  getSearchTickers: state => state.tickers,
  getSearchResults: state => state.results,
  getSearchStatus: state => state.status,
  getSearchMeta: state => state.meta,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
