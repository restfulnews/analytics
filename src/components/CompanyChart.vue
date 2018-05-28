<template>
  <md-card id="CompanyChart">
    <line-chart
      :chart-data="chartdata"
      :options="chartOptions"
    />
    
  </md-card>
</template>

<script>
import LineChart from '@/components/LineChart';
import axios from 'axios';
// import fecha from 'fecha';

export default {
  name: 'CompanyChart',
  components: {
    'line-chart': LineChart,
  },
  props: ['chartdata'],
  mounted() {
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time',
            },
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Prices (AUD)',
            },
          }],
        },
      },
    };
  },
};
</script>

<style scoped>
.loading-title {
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
