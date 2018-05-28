<template>
  <div>
    <md-card md-with-hover>
      Name : {{website.name}}
      <md-button class="md-dense md-primary" href="website.route">View</md-button> 
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
</style>
