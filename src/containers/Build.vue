<template>
  <div class='centred-card'>
    <build-card/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BuildCard from '@/components/BuildCard';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import router from '../router';

export default {
  name: 'Build',
  components: {
    'feature-unavailable': FeatureUnavailable,
    'build-card': BuildCard,
  },
  methods: {
    ...mapActions([
      'updateAppTitle',
    ]),
    navigate() {
      router.go(-1);
    },
  },
  mounted() {
    this.updateAppTitle('Build');
  },
};
</script>

<style scoped>
.centred-card {
  margin-left: auto;
  margin-right: auto;
}
</style>
