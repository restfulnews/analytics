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
          <md-button @click="predict(project.projectid, modelid, stock, numtweets, date)" class="md-primary">Predict</md-button>
      Prediction : {{result}}
    
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
      </md-table-row>
      <md-table-row v-for="model in project.models" v-bind:key="model['model id']">
        <md-table-cell md-numeric>{{model['model id']}}</md-table-cell>
        <md-table-cell>{{model['model name']}}</md-table-cell>
        <md-table-cell>{{model['model parameters']}}</md-table-cell>
        <md-table-cell>{{model['score']}}</md-table-cell>
      </md-table-row>
    </md-table>
    <br/>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectCard',
  props: ['project'],
  data : {
    modelid : "",
    stock : 0, 
    numtweets : 1,
    date : null,
    result : 0,
  },
  methods: {
    predict(projectid, modelid, stock, numtweets, date){
      axios
      .post(`${process.env.ANALYTICS_API_URI}/predict?projectid=${projectid}&modelid=${modelid}`,
        {
          "date" : date,
          "prev" : stock,
          "tweet count": numtweets
        },
      )
      .then((payload) => {
        this.result = payload.data.prediction
        console.log(payload)
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  },
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
</style>
