<template>
  <md-card id="Account">
    <div>
      <md-field>
        <label>First name</label>
        <md-input v-model="first"></md-input>
      </md-field>
      <md-field>
        <label>Last name</label>
        <md-input v-model="last" readonly></md-input>
      </md-field>
      <md-field>
        <label>API key</label>
        <md-input v-model="api" readonly disabled></md-input>
        <span class="md-helper-text">note: this is regenerated every 30 days.</span>
      </md-field>
      <md-field>
        <label>Usage type</label>
        <md-input v-model="usage"></md-input>
      </md-field>
      <md-field>
        <label>Bio</label>
        <md-textarea v-model="bio"></md-textarea>
      </md-field>
    </div>
    <md-button class="md-raised md-primary">
       Update Profile
    </md-button>
    <auth/>
  </md-card>
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
  data() {
    return {
      first: 'Bob',
      last: 'Cutlass',
      api: 'CASDFAS89YFASDFHGDASJ2DA',
      usage: 'Education',
      bio: 'This is just a test user.',
    };
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
#Account {
  padding: 2em;
}
@media (min-width: 600px) {
  #Account {
    width: 1000px;
  }
}
</style>
