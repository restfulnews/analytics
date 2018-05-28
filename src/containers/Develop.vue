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
            <customise-website
              v-if="getSearchMeta"
              :webdata="getSearchMeta"
              :articles="getSearchResults"
              :chartdata="getSearchCharts"
            />
          </div>
        </div>
      </md-step>
      <md-step id="third" md-label="Generate">
        <md-toolbar v-if="getDevelopStatus == 'fetched'">
          <div class="md-toolbar-row">
              <md-button
                class="md-raised md-primary search-btn"
                @click="generate()"
              >
                Rebuild
              </md-button>
              <md-button
                :href="getDevelopDownloadUrl"
                class="md-raised md-info search-btn"
              >
                Download
              </md-button>
              <pre></pre>
              <md-field>
                <label>Choose Company</label>
                <md-select v-model="selectedCompany" name="colors" id="colors">
                  <md-option v-for="item in allCompanies" :key="item.name" :value="item">
                    {{item.name}}
                  </md-option>
                </md-select>
              </md-field>
              <md-button
                @click="generateModels"
                class="md-raised md-info search-btn"
              >
                Models
              </md-button>
              <pre></pre>
            <md-field md-clearable>
              <label>Share via email.</label>
              <md-input v-model="email"></md-input>
            </md-field>
            <md-button @click="sentEmail">
              <md-icon>email</md-icon>
            </md-button>
            <md-field md-clearable>
              <label>Share via SMS.</label>
              <md-input v-model="phone"></md-input>
            </md-field>
            <md-button @click="sentText">
              <md-icon>sms</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <processing-chart
          text="Building website..."
          v-if="getSearchStatus == 'fetching' || getDevelopStatus == 'fetching'"
        /><br>
        <md-tabs class="md-primary" v-if="getDevelopStatus == 'fetched'">
          <md-tab id="tab-home" md-label="Website Preview" md-icon="remove_red_eye">
            <iframe :src="getDevelopPreviewUrl"
              width="100%"
              class="iframe"
            />
          </md-tab>
          <md-tab id="tab-pages" md-label="Customise Website" md-icon="assignment">
            <customise-website
              :webdata="getSearchMeta"
              :articles="getSearchResults"
              :chartdata="getSearchCharts"
            />
          </md-tab>
        </md-tabs>
      </md-step>
    </md-steppers>
    <auth/>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import Auth from '@/containers/Auth';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import ProcessingBox from '@/components/ProcessingBox';
import NewsCard from '@/components/NewsCard';
import CustomiseWebsite from '@/containers/CustomiseWebsite';

export default {
  name: 'Develop',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
    'processing-chart': ProcessingBox,
    'news-card': NewsCard,
    'customise-website': CustomiseWebsite,
  },
  data() {
    return {
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      iframe: '<iframe width="100%" src="http://api.restfulnews.com/website/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjg0NDJlOTQ4NWI4MjllYzhjNDEwZSIsImlhdCI6MTUyNTY4MDE0N30.JIgC5_BnmmoMdqzChG4YmqeEMNdjOklxrJvx6IpM6TU"></iframe>',
      selectedCompany: null,
    };
  },
  computed: {
    ...mapGetters([
      'getSearchResults',
      'getSearchStatus',
      'getDevelopStatus',
      'getSearchMeta',
      'getSearchCharts',
      'getDevelopPreviewUrl',
      'getDevelopDownloadUrl',
      'getDevelopName',
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
    /* develop */
    email: {
      get() { return this.$store.state.develop.email; },
      set(val) { this.updateDevelopEmail(val); },
    },
    phone: {
      get() { return this.$store.state.develop.phone; },
      set(val) { this.updateDevelopPhone(val); },
    },
    allCompanies() {
      return this.getSearchMeta.companies;
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
      'updateDevelopEmail',
      'updateDevelopPhone',
      'generateWebsite',
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
      this.generateWebsite({
        articles: this.getSearchResults,
        charts: this.getSearchCharts,
        email: this.$store.state.auth.email,
      });
      this.setDone('second', 'third');
    },
    // todo: move these methods into the store
    sentText() {
      const message = `Click on the link below to preview a site, shared with you, generated by RN Analytics. ${this.getDevelopPreviewUrl}`;
      axios
        .get(`${process.env.ANALYTICS_API_URI}/text?number=${this.phone}&text=${message}`)
        .then(() => { alert('Text message sent!'); })
        .catch(err => console.log(err));
    },
    sentEmail() {
      const heading = 'Someone has shared an RN Analytics site with you.';
      const message = `Click on the link below to preview a site, shared with you, generated by RN Analytics. ${this.getDevelopPreviewUrl}`;
      axios
        .get(`${process.env.ANALYTICS_API_URI}/email?to=${this.email}&message=${message}&heading=${heading}`)
        .then(() => { alert('Email sent!'); })
        .catch(err => console.log(err));
    },
    generateModels() {
      console.log(this.selectedCompany.ticker);
      const companyid = this.selectedCompany.ticker.split('.')[0].toLowerCase();
      const companyname = this.selectedCompany.shortName;
      const topics = this.keywords.join(' ').toLowerCase();
      const uri = `${process.env.ANALYTICS_API_URI}/datarobot?name=${this.getDevelopName}&companyid=${companyid}&companyname=${companyname}&topics=${topics}&user=${this.$store.state.auth.email}`;
      alert('Your models have started generating.');
      axios
        .get(uri)
        .catch(err => console.log(err));
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
.iframe {
  height: 100vh;
}
</style>
