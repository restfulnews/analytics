<template>
 <feature-unavailable/>
</template>

<script>
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';

export default {
  name: 'Bookmarks',
  components: {
    'feature-unavailable': FeatureUnavailable,
  },
  methods: mapActions([
    'updateTitle',
  ]),
  mounted() {
    this.updateTitle('Bookmarks');
  },
};
</script>

<style scoped>
</style>
