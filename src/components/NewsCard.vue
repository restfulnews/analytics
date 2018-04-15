<template>
  <md-card class="news-card">
    <md-card-media>
      <div :style="{
        'height': '15em',
        'background-size': 'cover',
        'background-image': `url(${thumbnail})`
      }"/>
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{title && title}}</div>
      <div class="md-subhead">{{abstract}}</div>
    </md-card-header>
    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div>
          <md-button class="md-icon-button">
            <md-icon>pageview</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>bookmark</md-icon>
          </md-button>
          <md-button class="md-icon-button" :href="url" target="_blank">
            <md-icon>link</md-icon>
          </md-button>
        </div>
        <md-card-expand-trigger>
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-actions>
      <md-card-expand-content>
        <md-card-content>
          {{publishedAt}}
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<script>
export default {
  name: 'NewsCard',
  props: ['thumbnail', 'title', 'publishedAt', 'abstract', 'url'],
};
</script>

<style scoped>
</style>
