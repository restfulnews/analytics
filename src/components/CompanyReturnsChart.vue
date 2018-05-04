<template>
  <div class="small">
    <line-chart
      :chart-data="datacollection"
      :options="{maintainAspectRatio: false}"
      :height="400"
    >
    </line-chart>
  </div>
</template>

<script>
import LineChart from '@/store/lineChart';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Company One',
            backgroundColor: '#03A9F4',
            data: [this.getRandomInt(), this.getRandomInt()],
          }, {
            label: 'Company Two',
            backgroundColor: '#FF5722',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (46)) + 5;
    },
  },
};
</script>

<style>
  .small {
    max-width: 600px;
    margin: 50px auto;
  };
</style>
