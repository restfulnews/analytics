<template>
  <md-empty-state
    class="empty-state"
    md-rounded
    md-icon="chrome_reader_mode"
    md-label="Article View"
    md-description="Click on view article to display the article.">
  </md-empty-state>
</template>

<script>
export default {
  name: 'EmptyArticle',
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
</style>
