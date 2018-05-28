<template>
  <div>
    <md-card md-with-hover class="websitecard">
      <md-button class="md-dense md-primary" :href="website.route">View</md-button>
      <iframe :src="website.route"
        width="100%"
        height=200px
        class="iframe"
      />
    </md-card>
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
  height: 400px;
}
</style>
