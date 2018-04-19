<template>
  <div>
    <section class="hero is-primary is-bold is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {RN} Analytics
          </h1>
          <h2 class="subtitle">
            News Analytics Platform
          </h2>
        </div>
      </div>
    </section>
    <section class="section main-container">
      <div class="columns">
      <md-card>
        hello aosifhasoifnaosifna osifnasoifna sofians foiasnf 
      </md-card>
      <md-card>
        hello aosifhasoifnaosifna osifnasoifna sofians foiasnf 
      </md-card>
      <md-card>
        hello aosifhasoifnaosifna osifnasoifna sofians foiasnf 
      </md-card>

      </div>

    </section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>RN Analytics</strong> ~ Copyright (c) 2018
            <a href="https://restfulnews.com">RESTfulNews Group</a>.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';

export default {
  name: 'Home',
  components: {
    'feature-unavailable': FeatureUnavailable,
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults;
    },
  },
  methods: mapActions([
    'updateAppTitle',
  ]),
  mounted() {
    this.updateAppTitle('RN Analytics');
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  min-height: 60vh;
  flex-direction: column;
}
</style>
