<template>
  <md-card class="news-card">
    <md-card-media>
      <div :style="{
        'height': '15em',
        'background-size': 'cover',
        'background-image': `url(${article.thumbnail})`
      }"/>
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{article.title && article.title}}</div>
      <div class="md-subhead">Published on {{formatDate(article.publishedAt)}}</div><br>
      <div class="md-subhead">{{article.abstract}}</div>
      <div class="md-subhead" v-if="article.companies"><br>
        <md-chip class="md-default" v-for="company in article.companies" :key="company.ticker">
          {{ company.name }} ({{ company.ticker }})
        </md-chip>
      </div>
    </md-card-header>
    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div>
          <md-button
            @click="updateSearchViewUrl(article.url)"
            class="md-icon-button"
          >
            <md-icon>pageview</md-icon>
          </md-button>
          <!-- <md-button class="md-icon-button">
            <md-icon>bookmark</md-icon>
          </md-button> -->
          <md-button class="md-icon-button" :href="article.url" target="_blank">
            <md-icon>link</md-icon>
          </md-button>
        </div>
      </md-card-actions>
    </md-card-expand>
  </md-card>
</template>

<script>
import fecha from 'fecha';
import { mapActions } from 'vuex';

export default {
  name: 'NewsCard',
  props: ['article'],
  methods: {
    ...mapActions([
      'updateSearchViewUrl',
    ]),
    formatDate(date) {
      return fecha.format(new Date(date), 'dddd MMMM Do, YYYY');
    },
  },
};
</script>

<style scoped>
</style>
