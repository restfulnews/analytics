<template>
  <div class="columns is-fullheight">
    <div class="column is-5 is-sidebar-menu">
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
        <md-chips
          v-model="keywords"
          md-check-duplicated="true"
          md-placeholder="Topics / Keywords."
        />
        <md-chips
          v-model="tickers"
          md-check-duplicated="true"
          md-placeholder="Reuters Ticker IDs / Company Names"
        />
        <md-button
          class="md-raised md-primary search-btn"
          @click="updateSearchResults()"
        >
          Search News
        </md-button>
      </md-card>
      <md-progress-bar class="loading is-hidden-desktop" md-mode="indeterminate"
        v-if="getSearchStatus == 'fetching'"/>
      <news-card
        v-for="result in getSearchResults"
        v-bind:article="result"
        :key="result.fingerprint"
      />
    </div>
    <div class="column is-main-content is-hidden-mobile">
      <processing-chart
        text="Retrieving articles..."
        v-if="getSearchStatus == 'fetching'"/>
    </div>
    <auth />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Auth from '@/containers/Auth';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import NewsCard from '@/components/NewsCard';
import ProcessingBox from '@/components/ProcessingBox';

export default {
  name: 'Explore',
  components: {
    auth: Auth,
    'news-card': NewsCard,
    'feature-unavailable': FeatureUnavailable,
    'processing-chart': ProcessingBox,
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
    keywords: {
      get() { return this.$store.state.search.keywords; },
      set(val) { this.updateSearchKeywords(val); },
    },
    tickers: {
      get() { return this.$store.state.search.tickers; },
      set(val) { this.updateSearchTickers(val); },
    },
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
  },
  mounted() {
    this.updateAppTitle('Explore');
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
.loading {
  text-align: center;
  width: 90%;
  margin: 25px;
}
</style>
