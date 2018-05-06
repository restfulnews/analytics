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
            <article class="message" v-if="getSearchMeta">
              <div class="message-header">
                <p>Report Details</p>
              </div>
              <div class="message-body">
                <md-table
                  v-model="getSearchMeta.companies"
                  md-sort="name"
                  md-sort-order="asc"
                  md-card
                >
                  <md-table-toolbar>
                    <h1 class="md-title">Companies</h1>
                  </md-table-toolbar>
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Company" md-sort-by="name">
                      {{ item.name }}
                    </md-table-cell>
                    <md-table-cell md-label="Reuters Ticker" md-numeric>
                      {{ item.ticker }}
                    </md-table-cell>
                    <md-table-cell md-label="Website" md-sort-by="email">
                      <a :href="item.websiteUrl" target="_blank">
                        {{ item.websiteUrl }}
                      </a>
                    </md-table-cell>
                    <md-table-cell md-label="PermID" md-sort-by="gender">
                      <a :href="item.permidUrl" target="_blank">
                        {{ item.permidUrl }}
                      </a>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </article>
            <div v-if="getSearchMeta">
              <div v-for="company in getSearchMeta.companies" :key="company.ticker">
                <br>
                <h1 class="subtitle is-4 loading-title">
                  {{company.name}}
                  <small>({{company.ticker}})</small>
                </h1>
                <fake-company-chart
                  :name="company.name"
                  :ticker="company.ticker"
                />
              </div>
            </div>
          </div>
        </div>
      </md-step>
      <md-step id="third" md-label="Generate">
        <processing-chart
          text="Building website..."
          v-if="getSearchStatus == 'fetching'"
        />
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
import FakeCompanyChart from '@/components/FakeCompanyChart';
import NewsCard from '@/components/NewsCard';

export default {
  name: 'Analyse',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
    'processing-chart': ProcessingBox,
    'news-card': NewsCard,
    'fake-company-chart': FakeCompanyChart,
  },
  data() {
    return {
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
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
    this.updateAppTitle('Analyse');
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
</style>
