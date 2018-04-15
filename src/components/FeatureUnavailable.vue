<template>
  <md-empty-state
    class="empty-state"
    md-rounded
    md-icon="not_interested"
    md-label="Feature Unavailable"
    md-description="RN developers are currently working on this feature.">
  </md-empty-state>
</template>

<script>
export default {
  name: 'FeatureUnavailable',
};
</script>

<style scoped>
.empty-state {
  background-color: rgb(240, 240, 240);
  margin-top: 5%;
}
</style>
