<template>
  <div>
    <md-card class="md-gutter">
      <article class="message is-primary">
      <div class="message-header">
        <p>Website Details</p>
      </div>
      <div class="message-body">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label>Model Id</label>
              <md-input v-model="modelid"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field >
              <label>Project Id</label>
              <md-input disabled v-model="project.projectid"></md-input>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label>Stock Price</label>
              <md-input v-model="stock"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field>
              <label>Number Tweets</label>
              <md-input v-model="numtweets"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-datepicker v-model="date"/>
          </div>

        </div>
      </div>
    </article>
    </md-card>

    <br/>
    <md-table md-card md-with-hover>
      <md-table-toolbar>
        <h1 class="md-title">{{project.name}}</h1>
        <h3 class="md-title">{{project.companyname}} and {{project.topics}}</h3>
        <br/>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head md-numeric>Model Id</md-table-head>
        <md-table-head>Model Name</md-table-head>
        <md-table-head>Model Parameters</md-table-head>
        <md-table-head>RMSE Score</md-table-head>
        <md-table-head>Try</md-table-head>
      </md-table-row>
      <md-table-row v-for="model in project.models" v-bind:key="model['model id']">
        <md-table-cell md-numeric>{{model['model id']}}</md-table-cell>
        <md-table-cell>{{model['model name']}}</md-table-cell>
        <md-table-cell>{{model['model parameters']}}</md-table-cell>
        <md-table-cell>{{model['score']}}</md-table-cell>
        <md-table-cell>
          <md-button @click="setmodelid(model['model id'])" class="md-primary">Primary</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <br/>
  </div>
  
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
  data : {
    modelid : "",
    stock : 0, 
    numtweets : 1,
    date : new Date(),
  },
  methods: {
    //got to do a mock post request here for getting the prediction
  },
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
</style>
