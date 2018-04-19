<template>
  <md-empty-state
    class="empty-state"
    md-rounded
    md-icon="not_interested"
    md-label="404"
    md-description="Page Not Found">
  </md-empty-state>
</template>

<script>
export default {
  name: 'Empty404',
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
</style>
