<template>
  <div id="Bookmarks">
    <feature-unavailable/>
    <auth/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import Auth from '@/containers/Auth';

export default {
  name: 'Bookmarks',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
  },
  methods: mapActions([
    'updateAppTitle',
  ]),
  mounted() {
    this.updateAppTitle('Bookmarks');
  },
};
</script>

<style scoped>
</style>
