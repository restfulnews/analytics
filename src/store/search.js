/* eslint-disable no-shadow */
import axios from 'axios';
import fecha from 'fecha';
import http from '../utils/http';

const state = {
  startTime: new Date(2018, 4, 22),
  endTime: new Date(2018,4, 29),
  keywords: ['Plastic', 'Bags'],
  tickers: ['Woolworths', 'WES'],
  results: [],
  charts: [],
  status: null,
  viewUrl: null,
  meta: null,
  limit: 50,
};

const actions = {
  updateSearchStartTime({ commit }, time) {
    commit('setSearchStartTime', time);
  },
  updateSearchEndTime({ commit }, time) {
    commit('setSearchEndTime', time);
  },
  updateSearchLimit({ commit }, limit) {
    commit('setSearchLimit', limit);
  },
  updateSearchKeywords({ commit }, keywords) {
    commit('setSearchKeywords', keywords);
  },
  updateSearchTickers({ commit }, tickers) {
    commit('setSearchTickers', tickers);
  },
  updateSearchViewUrl({ commit }, url) {
    commit('setSearchViewUrl', url);
  },
  updateSearchResults({ commit, state }) {
    const startTime = state.startTime.toISOString();
    const endTime = state.endTime.toISOString();
    const tickers = state.tickers.join();
    const keywords = state.keywords.join();
    const limit = state.limit;
    const url = `/search?topics=${keywords}&start_date=${startTime}&end_date=${endTime}&companyids=${tickers}&limit=${limit}`;
    commit('setSearchStatus', 'fetching');
    commit('setSearchMeta', null);
    http.get(url)
      .then((response) => {
        commit('setSearchResults', response.data.data);
        commit('setSearchStatus', 'fetched');
        commit('setSearchMeta', {
          elapsedTime: response.data.elapsedTime,
          companies: response.data.companies,
          keywords: state.keywords,
          tickers: state.tickers,
        });
        commit('setSearchCharts', []);
        const today = new Date();
        const enDate = fecha.format(today, 'YYYY-MM-DD');
        today.setMonth(today.getMonth() - 1);
        const stDate = fecha.format(today, 'YYYY-MM-DD');
        response.data.companies.forEach(async (company) => {
          await axios
            .get(`${process.env.ANALYTICS_API_URI}/returns?companyid=${company.ticker}&start_date=${stDate}&end_date=${enDate}`)
            .then(async (res) => {
              let tweetsRes = {};
              // get number of tweets
              await axios
                .get(`${process.env.ANALYTICS_API_URI}/twitter?topics=${keywords}&company=${company.shortName}&start_date=${stDate}&end_date=${enDate}`)
                .then((res2) => {
                  tweetsRes = res2.data.data;
                });
              const chartObj = await {
                ticker: company.ticker,
                labels: res.data.map(s => s.date),
                datasets: [
                  {
                    label: `${company.name} Stock Price`,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    fill: false,
                    data: res.data.map(s => parseFloat(s.price)),
                  },
                  {
                    label: 'Number of Related Tweets',
                    backgroundColor: '#4BC0C0',
                    borderColor: '#4BC0C0',
                    fill: false,
                    data: tweetsRes.map(s => parseFloat(s['tweet count'])),
                  },
                ],
              };
              await commit('addSearchChart', chartObj);
            });
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
  setSearchCharts(state, charts) {
    state.charts = charts;
  },
  addSearchChart(state, chart) {
    state.charts.push(chart);
  },
  setSearchStatus(state, status) {
    state.status = status;
  },
  setSearchMeta(state, meta) {
    state.meta = meta;
  },
  setSearchLimit(state, limit) {
    state.limit = limit;
  },
  setSearchViewUrl(state, viewUrl) {
    state.viewUrl = `http://x-frame-options-bypass.herokuapp.com/?url=${viewUrl}`;
  },
};

const getters = {
  getSearchStartTime: state => state.startTime,
  getSearchEndTime: state => state.endTime,
  getSearchKeywords: state => state.keywords,
  getSearchTickers: state => state.tickers,
  getSearchResults: state => state.results,
  getSearchCharts: state => state.charts,
  getSearchStatus: state => state.status,
  getSearchMeta: state => state.meta,
  getSearchLimit: state => state.limit,
  getSearchViewUrl: state => state.viewUrl,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
