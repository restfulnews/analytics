<template>
  <md-card id="FakeCompanyChart">
    <line-chart
      :chart-data="chartData"
      :options="chartOptions"
    />
  </md-card>
</template>

<script>
import LineChart from '@/components/LineChart';
import axios from 'axios';
import fecha from 'fecha';

export default {
  name: 'FakeCompanyChart',
  components: {
    'line-chart': LineChart,
  },
  props: ['name', 'ticker'],
  methods: {
    generateChartData() {
      this.chartData = {
        labels: this.getChartLabels,
        datasets: [
          {
            label: this.name,
            data: this.getchartDataset,
          },
        ],
      };
    },
    getTimeSeriesDate() {
      const d = new Date();
      d.setDate(d.getDate() - 5);
      const params = {
        id: this.ticker,
        date: fecha.format(new Date(d), 'YYYY-MM-DD'),
        varlist: 'AV_Return',
        lower: 30,
        upper: 0,
      };
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const url = 'http://team-distribution.info/api/v3/returns';
      axios
        .get(`${proxy}${url}`, { params })
        .then((res) => {
          const entries = res.data.data.entries;
          this.chartLabels = Object.keys(entries);
          const rand = Math.floor(Math.random() * 16) + 5;
          this.chartDataset = this.chartLabels.map(entry => rand - entries[entry].AV_returns);
          this.generateChartData();
        });
    },
  },
  mounted() {
    this.generateChartData();
    this.getTimeSeriesDate();
  },
  computed: {
    getChartLabels() {
      return this.chartLabels;
    },
    getchartDataset() {
      return this.chartDataset;
    },
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
        },
      },
      chartLabels: [],
      chartDataset: [],
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
