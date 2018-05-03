<template>
    <div>
        <span class="md-display-4">Welcome</span>
        <md-card class="md-accent" md-with-hover>
            <md-card-header>
                <div class="md-title">Analyse the news</div>
            </md-card-header>

            <md-card-content>
                <span>I'm interested in how...</span>
                <md-chips
                    md-deletable
                    v-model="keywords"
                    md-check-duplicated="true"
                    md-placeholder="keywords"
                />
                <span>...affects...</span>
                <md-chips
                    v-model="tickers"
                    md-check-duplicated="true"
                    md-placeholder="companies and company tickers"
                />
            </md-card-content>

            <md-card-actions>
                <router-link @click.native="updateSearchResults()" :to="{ name: 'Refine', params: { keywords: keywords, tickers: tickers } }" tag="md-button">Refine</router-link>
            </md-card-actions>
        </md-card>
        <md-progress-bar class="loading" md-mode="indeterminate"
        v-if="getSearchStatus == 'fetching'"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
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
      'updateSearchKeywords',
      'updateSearchTickers',
      'updateSearchResults',
      'updateAppTitle',
    ]),
  },
  mounted() {
    this.updateAppTitle('Home');
  },
};
</script>

<style scoped>
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
  background-color: white;
}
.loading {
  text-align: center;
  width: 90%;
  margin: 25px;
}
</style>
