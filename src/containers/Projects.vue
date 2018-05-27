<template>
  <md-tabs>
    <md-tab id="tab-websites" md-label="Websites" md-icon="web">
      <md-empty-state
        md-icon="web"
        md-label="Create your first website"
        md-description="It seems like you don't have any saved websites yet.">
        <md-button class="md-primary md-raised" to="develop">Generate a website</md-button>
      </md-empty-state>
    </md-tab>
    <md-tab id="tab-models" md-label="Models" md-icon="group_work">
      <md-empty-state
        md-icon="group_work"
        md-label="Create your first model"
        md-description="It seems like you don't have any saved models yet.">
        <md-button class="md-primary md-raised" to="develop">Generate a model</md-button>
      </md-empty-state>
    </md-tab>
  </md-tabs>
</template>

<script>
import Auth from '@/containers/Auth';
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';

export default {
  name: 'Projects',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
  },
  data() {
    return {
      stuff: 'yep',
    };
  },
  methods: mapActions([
    'updateAppTitle',
  ]),
  mounted() {
    this.updateAppTitle('My Projects');
  },
};
</script>

<style scoped>
</style>
