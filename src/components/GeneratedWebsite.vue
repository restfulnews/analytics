<template>
  <div id="GeneratedWebsite">
    <article class="message">
      <div class="message-header">
        <p>Customize report</p>
      </div>
      <div class="message-body">
            <md-field>
              <label for="colour">Colour</label>
              <md-select v-model="colour" name="colour" id="colour">
                <md-option value="red">Red</md-option>
                <md-option value="blue">Blue</md-option>
              </md-select>
            </md-field>

            <md-field md-inline>
              <label>Website Name</label>
              <md-input v-model="inline"></md-input>
            </md-field>

            <md-field :class="messageClass">
              <label>Report Bio</label>
              <md-textarea v-model="textarea" required></md-textarea>
              <span class="md-helper-text">Helper text</span>
              <span class="md-error">There is an error</span>
            </md-field>
      </div>
    </article>
    
    <article class="message">
      <div class="message-header">
        <p>Report Details</p>
      </div>
      <div class="message-body">
        <h1 class="md-title custom-table">Request Details</h1>
        <table class="custom-table table is-bordered">
            <tr>
                <td><b>Topics</b></td>
                <td v-for="t in webdata.keywords" :key="t">
                  {{t}}
                </td>
            </tr>
            <tr>
                <td><b>Companies</b></td>
                <td v-for="t in webdata.tickers" :key="t">
                  {{t}}
                </td>
            </tr>
            <tr>
                <td><b>Build time</b></td>
                <td>
                  {{webdata.elapsedTime}}s
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
        <div class="md-layout">
          <div class="md-layout-item md-size-75">
             <fake-company-chart
                :name="company.name"
                :ticker="company.ticker"
              />
          </div>
          <div class="md-layout-item">
            <md-checkbox v-model="array" value="1">Add to website</md-checkbox>
            <br/>
            <md-checkbox v-model="array" value="1">Add description</md-checkbox>
            <md-field>
              <label>Write description to appear on website</label>
              <md-textarea v-model="textarea" md-counter="160"></md-textarea>
            </md-field>
          </div>
        </div>    
      </div>
    </div>
    <div>
      <br>
      <h1 class="md-title custom-table">Company Timeline</h1>
      <graph-card
        :tickers="webdata.tickers"
        :results="articles"
        :webdata="webdata"
      />
    </div>
  </div>
</template>

<script>
import FakeCompanyChart from '@/components/FakeCompanyChart';
import GraphCard from '@/components/GraphCard';

export default {
  name: 'GeneratedWebsite',
  props: ['webdata', 'articles'],
  components: {
    'fake-company-chart': FakeCompanyChart,
    'graph-card': GraphCard,
  },
};
</script>

<style scoped>
.custom-table {
  margin-left: 20px;
}
</style>
