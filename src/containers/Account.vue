<template>
 <feature-unavailable/>
</template>

<script>
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';

export default {
  name: 'Account',
  components: {
    'feature-unavailable': FeatureUnavailable,
  },
  methods: mapActions([
    'updateTitle',
  ]),
  mounted() {
    this.updateTitle('Account');
  },
};
</script>

<style scoped>
</style>
