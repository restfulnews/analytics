/* eslint-disable no-shadow */
import axios from 'axios';

// initial state
const state = {
  startTime: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
  endTime: new Date(),
  keywords: ['australia'],
  tickers: ['woolworths'],
  results: [],
  searchStatus: null,
};

// getters
const getters = {
  startTime: state => state.startTime,
  endTime: state => state.endTime,
  keywords: state => state.keywords,
  tickers: state => state.tickers,
  results: state => state.results,
  searchStatus: state => state.searchStatus,
};

// actions
const actions = {
  updateStartTime({ commit }, time) {
    commit('setStartTime', time);
  },
  updateEndTime({ commit }, time) {
    commit('setEndTime', time);
  },
  updateKeywords({ commit }, keywords) {
    commit('setKeywords', keywords);
  },
  updateTickers({ commit }, tickers) {
    commit('setTickers', tickers);
  },
  updateResults({ commit, state }) {
    const startTime = state.startTime.toISOString();
    const endTime = state.endTime.toISOString();
    const tickers = state.tickers.join();
    const keywords = state.keywords.join();
    const url = `http://api.restfulnews.com/search?topics=${keywords}&start_date=${startTime}&end_date=${endTime}&companyids=${tickers}`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYmQ0ZWI2MTVhZmJkNjRiZDIzNDRjYyIsImlhdCI6MTUyMzc5MDQ2OX0.qleqkrk58vmsEHx5AU1Uugf66tmmzZI6VAzCZ9_VKbs';
    commit('setSearchStatus', 'fetching');
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        commit('setResults', response.data.data);
        commit('setSearchStatus', 'fetched');
      })
      .catch((error) => {
        commit('setSearchStatus', `failed: ${error.status}`);
      });
  },
};

// mutations
const mutations = {
  setStartTime(state, time) {
    state.startTime = time;
  },
  setEndTime(state, time) {
    state.endTime = time;
  },
  setKeywords(state, keywords) {
    state.keywords = keywords;
  },
  setTickers(state, tickers) {
    state.tickers = tickers;
  },
  setResults(state, results) {
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
