<template>
  <div>
    <md-card class="news-search">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-datepicker v-model="startTime">
            <label>Start time</label>
          </md-datepicker>
        </div>
        <div class="md-layout-item">
          <md-datepicker v-model="endTime">
            <label>End time</label>
          </md-datepicker>
        </div>
      </div>
      <md-button class="md-raised md-primary search-btn" @click="updateSearchResults()">
        Search News
      </md-button>
    </md-card>
    <md-progress-bar class="md-accent" md-mode="query"
      v-if="getSearchStatus == 'fetching'"/>
    <company-returns-chart />
    <div class="columns is-fullheight">
      <div class="column is-5 is-sidebar-menu">
        <news-card
          v-for="result in getSearchResults"
          v-bind:key="result.fingerprint"
          v-bind:thumbnail="result.thumbnail"
          v-bind:abstract="result.abstract"
          v-bind:publishedAt="result.publishedAt"
          v-bind:title="result.title"
          v-bind:url="result.url"
        />
      </div>
      <div class="column is-main-content is-hidden-mobile">
        <graph-card
          v-bind:tickers="tickers"
          v-bind:results="getSearchResults"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NewsCard from '@/components/NewsCard';
import GraphCard from '@/components/GraphCard';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import router from '../router';

export default {
  name: 'Refine',
  data() {
    return {
      keywords: 'something went wrong lol oops',
      tickers: 'tick tock im a clock',
    };
  },
  created() {
    this.keywords = this.$route.params.keywords;
    this.tickers = this.$route.params.tickers;
  },
  components: {
    'news-card': NewsCard,
    'graph-card': GraphCard,
    'feature-unavailable': FeatureUnavailable,
  },
  computed: {
    ...mapGetters([
      'getSearchResults',
      'getSearchStatus',
    ]),
    startTime: {
      get() { return this.$store.state.search.startTime; },
      set(val) { this.updateSearchStartTime(val); },
    },
    endTime: {
      get() { return this.$store.state.search.endTime; },
      set(val) { this.updateSearchEndTime(val); },
    },
    // keywords: {
    //   get() { return this.$store.state.search.keywords; },
    //   set(val) { this.updateSearchKeywords(val); },
    // },
    // tickers: {
    //   get() { return this.$store.state.search.tickers; },
    //   set(val) { this.updateSearchTickers(val); },
    // },
  },
  methods: {
    ...mapActions([
      'updateSearchStartTime',
      'updateSearchEndTime',
      'updateSearchKeywords',
      'updateSearchTickers',
      'updateSearchResults',
      'updateAppTitle',
    ]),
    navigate() {
      router.go(-1);
    },
  },
  mounted() {
    this.updateAppTitle('Refine');
  },
};
</script>

<style scoped>
.columns.is-fullheight {
  min-height: calc(96vh - ( 3.25rem - .75rem ));
  max-height: calc(96vh - ( 3.25rem - .75rem ));
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}
.columns.is-fullheight .column {
  overflow-y: auto;
}
.news-search {
  padding: 1em;
}
.news-card {
  background-color: white;
  margin-top: 2em;
}
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 20%;
}
.chips {
  display: inline;
  padding-bottom: .4em;
}
.md-progress-bar {
  text-align: center;
  width: 90%;
  margin: 25px;
}
</style>
