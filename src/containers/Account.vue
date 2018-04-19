<template>
 <div id="Account">
   <feature-unavailable/>
   <auth/>
 </div>
</template>

<script>
import Auth from '@/containers/Auth';
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';

export default {
  name: 'Account',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
  },
  methods: mapActions([
    'updateAppTitle',
  ]),
  mounted() {
    this.updateAppTitle('Account');
  },
};
</script>

<style scoped>
</style>
