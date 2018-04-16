<template>
  <div class="columns is-fullheight">
    <div class="column is-5 is-sidebar-menu">
      <md-card class="news-search">
        <div class="md-layout">
          <div class="md-layout-item">
            <md-datepicker v-model="startTime"><label>Start time</label></md-datepicker>
          </div>
          <div class="md-layout-item">
            <md-datepicker v-model="endTime"><label>End time</label></md-datepicker>
          </div>
        </div>
        <md-chips
          v-model="keywords"
          md-insert="updateKeywords"
          md-check-duplicated="true"
          md-placeholder="Enter a keyword"
        />
        <md-chips
          v-model="tickers"
          md-insert="updateTickers"
          md-check-duplicated="true"
          md-placeholder="Enter a company ticker."
        />
        <md-button
          class="md-raised md-primary search-btn"
          @click="updateResults()"
        >
          Search News
        </md-button>
      </md-card>
      <md-progress-bar class="loading" md-mode="indeterminate"
        v-if="searchStatus == 'fetching'"/>
      <news-card
        v-for="result in results"
        v-bind:key="result.fingerprint"
        v-bind:thumbnail="result.thumbnail"
        v-bind:abstract="result.abstract"
        v-bind:publishedAt="result.publishedAt"
        v-bind:title="result.title"
        v-bind:url="result.url"
      />
    </div>
    <div class="column is-main-content is-hidden-mobile">
      <feature-unavailable />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NewsCard from '@/components/NewsCard';
import FeatureUnavailable from '@/components/FeatureUnavailable';

export default {
  name: 'Explore',
  components: {
    'news-card': NewsCard,
    'feature-unavailable': FeatureUnavailable,
  },
  computed: {
    ...mapGetters([
      'startTime',
      'endTime',
      'keywords',
      'tickers',
      'results',
      'searchStatus',
    ]),
  },
  methods: mapActions([
    'updateStartTime',
    'updateEndTime',
    'updateKeywords',
    'updateTickers',
    'updateResults',
    'updateTitle',
  ]),
  mounted() {
    this.updateTitle('Explore');
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
