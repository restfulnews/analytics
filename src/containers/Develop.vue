<template>
  <div id="Analyse">
    <md-steppers :md-active-step.sync="active" md-alternative>
      <md-step id="first" md-label="Analyse">
        <md-card class="news-search">
          <h5 class="subtitle is-5">I'm interested in how ...</h5>
          <md-chips
            v-model="keywords"
            md-check-duplicated="true"
            md-placeholder="Topics / Keywords."
          />
          <h5 class="subtitle is-5">... affects ...</h5>
          <md-chips
            v-model="tickers"
            md-check-duplicated="true"
            md-placeholder="Reuters Ticker IDs / Company Names"
          />
          <md-button
            class="md-raised md-primary search-btn"
            @click="refine()"
          >
            Refine
          </md-button>
        </md-card>
      </md-step>
      <md-step id="second" md-label="Refine">
        <div class="columns is-fullheight">
          <div class="column is-5 is-sidebar-menu">
            <md-card class="news-search">
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
                <div class="md-layout-item">
                  <h4>Limit results to <span class="limit">{{limit}}</span> articles.</h4>
                  <input
                    step="1"
                    min="0"
                    max="100"
                    type="range"
                    v-model="limit"
                  >
                </div>
              </div>
              <md-button
                class="md-raised md-default search-btn"
                @click="refine()"
              >
                Refine Again
              </md-button>
              <md-button
                class="md-raised md-primary search-btn"
                @click="generate()"
              >
                Generate Website
              </md-button>
            </md-card>
            <news-card
              v-for="result in getSearchResults"
              v-bind:article="result"
              :key="result.fingerprint"
            />
          </div>
          <div class="column is-main-content is-hidden-mobile">
            <processing-chart
              text="Refining results..."
              v-if="getSearchStatus == 'fetching'"
            />
            <generated-website
              v-if="getSearchMeta"
              :webdata="getSearchMeta"
            />
          </div>
        </div>
      </md-step>
      <md-step id="third" md-label="Generate">
        <div class="container">
          <md-card
            class="card"
            v-if="getSearchMeta"
          >
            <div>
              <md-field>
                <label>IFRAME</label>
                <md-input v-model="iframe"></md-input>
                <span class="md-helper-text">
                  Embed this iframe tag to your website.
                </span>
              </md-field>
              <md-button
                class="md-raised md-primary search-btn"
                @click="generate()"
              >
                Rebuild Website
              </md-button>
            </div>
          </md-card>
          <processing-chart
            text="Building website..."
            v-if="getSearchStatus == 'fetching'"
          />
          <generated-website
            v-if="getSearchMeta"
            :webdata="getSearchMeta"
          />
        </div>
      </md-step>
    </md-steppers>
    <auth/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Auth from '@/containers/Auth';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import ProcessingBox from '@/components/ProcessingBox';
import NewsCard from '@/components/NewsCard';
import GeneratedWebsite from '@/components/GeneratedWebsite';

export default {
  name: 'Develop',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
    'processing-chart': ProcessingBox,
    'news-card': NewsCard,
    'generated-website': GeneratedWebsite,
  },
  data() {
    return {
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      iframe: '<iframe width="100%" src="http://api.restfulnews.com/website/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjg0NDJlOTQ4NWI4MjllYzhjNDEwZSIsImlhdCI6MTUyNTY4MDE0N30.JIgC5_BnmmoMdqzChG4YmqeEMNdjOklxrJvx6IpM6TU"></iframe>',
    };
  },
  computed: {
    ...mapGetters([
      'getSearchResults',
      'getSearchStatus',
      'getSearchMeta',
    ]),
    startTime: {
      get() { return this.$store.state.search.startTime; },
      set(val) { this.updateSearchStartTime(val); },
    },
    endTime: {
      get() { return this.$store.state.search.endTime; },
      set(val) { this.updateSearchEndTime(val); },
    },
    limit: {
      get() { return this.$store.state.search.limit; },
      set(val) { this.updateSearchLimit(val); },
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
      'updateSearchLimit',
      'updateAppTitle',
    ]),
    setDone(id, index) {
      this[id] = true;
      if (index) this.active = index;
    },
    refine() {
      this.updateSearchResults();
      this.setDone('first', 'second');
    },
    generate() {
      this.updateSearchResults();
      this.setDone('second', 'third');
    },
  },
  mounted() {
    this.updateAppTitle('Develop');
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
  padding: 1.3em;
}
.news-card {
  background-color: white;
  margin-top: 2em;
}
.card {
  padding: 2em;
  margin-bottom: 2em;
}
.limit {
  color: blue;
}
</style>
