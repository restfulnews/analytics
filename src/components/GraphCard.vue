<template>
  <div v-if="checkResults(results) === true">
    <timeline
        v-bind:results="results"
        v-bind:tickers="tickers"
    />
  </div>
</template>

<script>
import Timeline from './Timeline';
export default {
  name: 'GraphCard',
  components: {
    'timeline': Timeline,
  },
  props: ['tickers', 'results'],
  data: {
    chartData: {'2017-01-01': 11, '2017-01-02': 6}
  },
  methods : {
    checkResults: function(raw) {
        if (raw.length < 1){
            return false;
        }
        return true;
    }
  }
};
</script>

<style scoped>
</style>
