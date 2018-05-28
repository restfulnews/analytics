<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{project.name}}</h1>
        company name: {{project.companyname}}
        topics : {{project.topics}}
        project id : {{project.projectid}}
      </md-table-toolbar>
      <md-table-row>
        <md-table-head md-numeric>Model Id</md-table-head>
        <md-table-head>Model Name</md-table-head>
        <md-table-head>Model Parameters</md-table-head>
        <md-table-head>RMSE Score</md-table-head>
      </md-table-row>
      <md-table-row v-for="model in project.models" v-bind:key="model['model id']">
        <md-table-cell md-numeric>{{model['model id']}}</md-table-cell>
        <md-table-cell>{{model['model name']}}</md-table-cell>
        <md-table-cell>{{model['model parameters']}}</md-table-cell>
        <md-table-cell>{{model['score']}}</md-table-cell>
      </md-table-row>

    </md-table>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
</style>
