/* eslint-disable no-shadow */
import axios from 'axios';

const state = {
  startTime: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
  endTime: new Date(),
  keywords: ['australia'],
  tickers: ['woolworths'],
  results: [],
  status: null,
};

const getters = {
  getSearchStartTime: state => state.startTime,
  getSearchEndTime: state => state.endTime,
  getSearchKeywords: state => state.keywords,
  getSearchTickers: state => state.tickers,
  getSearchResults: state => state.results,
  getSearchStatus: state => state.status,
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
    const url = `http://api.restfulnews.com/search?topics=${keywords}&start_date=${startTime}&end_date=${endTime}&companyids=${tickers}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmQ0ZWI2MTVhZmJkNjRiZDIzNDRjYyIsImlhdCI6MTUyMzc5MDQ2OX0.qleqkrk58vmsEHx5AU1Uugf66tmmzZI6VAzCZ9_VKbs';
    commit('setSearchStatus', 'fetching');
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        commit('setSearchResults', response.data.data);
        commit('setSearchStatus', 'fetched');
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
    state.searchStatus = status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
