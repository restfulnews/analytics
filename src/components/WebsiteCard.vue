<template>
  <div>
    <a target="_blank" :href="website.route">
      <md-card md-with-hover class="websitecard">
        <iframe :src="website.route"
          width="100%"
          class="iframe"
        />
      </md-card>
    </a>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'WebsiteCard',
  props: ['website'],
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
.websitecard {
  height: 500px;
  margin-bottom: 20px;
}
.iframe {
  height: 500px;
}
</style>
