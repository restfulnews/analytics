<template>
  <div id="GeneratedWebsite">
    <article class="message is-primary">
      <div class="message-header">
        <p>Website Details</p>
      </div>
      <div class="message-body">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field md-inline>
              <label>Site Title</label>
              <md-input v-model="title"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field>
              <label>Colour Scheme</label>
              <md-select v-model="color" name="colors" id="colors">
                <md-option value="orange">Orange</md-option>
                <md-option value="blue">Blue</md-option>
                <md-option value="green">Green</md-option>
                <md-option value="pink">Pink</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
        <md-field :class="messageClass">
          <label>Site Description</label>
          <md-textarea v-model="description" required></md-textarea>
          <span class="md-helper-text">Build Time ~ {{webdata.elapsedTime}}s</span>
        </md-field>
      </div>
    </article>
    <article class="message is-primary">
      <div class="message-header">
        <p>Report Details</p>
      </div>
      <div class="message-body">
        <table class="custom-table table is-bordered">
          <tr>
              <td><b>Topics</b></td>
              <td v-for="t in webdata.keywords" :key="t">
                {{t}}
              </td>
          </tr>
        </table>
        <md-table
          v-model="webdata.companies"
          md-sort="name"
          md-sort-order="asc"
          md-card
        >
          <md-table-toolbar>
            <h1 class="md-title">Company Information</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Company" md-sort-by="name">
              {{ item.name }}
            </md-table-cell>
            <md-table-cell md-label="Reuters Ticker">
              <a :href="item.permidUrl" target="_blank">
                {{ item.ticker }}
              </a>
            </md-table-cell>
            <md-table-cell md-label="Company Website" md-sort-by="email">
              <a :href="item.websiteUrl" target="_blank">
                {{ item.websiteUrl }}
              </a>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </article>

    <article class="message is-primary">
      <div class="message-header">
        <p>Company Charts</p>
      </div>
      <div class="message-body">
        <div
          v-for="chart in chartdata"
          :key="chart.ticker"
        >
          <company-chart
            :chartdata="chart"
          />
          <br />
        </div>
      </div>
    </article>
    <div>
      <br>
      <h1 class="md-title custom-table">News Timeline</h1>
      <graph-card
        :tickers="webdata.tickers"
        :results="articles"
        :webdata="webdata"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CompanyChart from '@/components/CompanyChart';
import GraphCard from '@/components/GraphCard';

export default {
  name: 'CustomiseWebsite',
  props: ['webdata', 'articles', 'chartdata'],
  components: {
    'company-chart': CompanyChart,
    'graph-card': GraphCard,
  },
  computed: {
    ...mapGetters([
      'getDevelopNews',
      'getDevelopGraphs',
    ]),
    color: {
      get() { return this.$store.state.develop.color; },
      set(val) { this.updateDevelopColor(val); },
    },
    title: {
      get() { return this.$store.state.develop.title; },
      set(val) { this.updateDevelopTitle(val); },
    },
    description: {
      get() { return this.$store.state.develop.description; },
      set(val) { this.updateDevelopDescription(val); },
    },
  },
  methods: {
    ...mapActions([
      'updateDevelopName',
      'updateDevelopColor',
      'updateDevelopTitle',
      'updateDevelopDescription',
    ]),
  },
};
</script>

<style scoped>
.custom-table {
  margin-left: 20px;
}
</style>

const state = {
  name: null,
  color: null,
  title: null,
  description: null,
  email: null,
  phone: null,
  news: [],
  graphs: [],
  previewUrl: null,
  downloadUrl: null,
};
