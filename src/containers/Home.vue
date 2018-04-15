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
      <h1 class="title"><md-icon class="md-size-2x">show_chart</md-icon>
       Trending News</h1>
      <feature-unavailable/>
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
};
</script>

<style scoped>
.main-container {
  display: flex;
  min-height: 60vh;
  flex-direction: column;
}
</style>
