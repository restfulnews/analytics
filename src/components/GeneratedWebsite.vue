<template>
  <div id="GeneratedWebsite">
    <article class="message">
      <div class="message-header">
        <p>Report Details</p>
      </div>
      <div class="message-body">
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
    <div>
      <div v-for="company in webdata.companies" :key="company.ticker">
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
</template>

<script>
import FakeCompanyChart from '@/components/FakeCompanyChart';

export default {
  name: 'GeneratedWebsite',
  props: ['webdata'],
  components: {
    'fake-company-chart': FakeCompanyChart,
  },
};
</script>

<style scoped>
</style>
