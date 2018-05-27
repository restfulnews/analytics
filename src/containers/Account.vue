<template>
  <div id="Account">
    <md-card class="card">
      <md-field>
        <label>API URL</label>
        <md-input v-model="apiUrl" readonly disabled></md-input>
      </md-field>
      <md-field>
        <label>API Token</label>
        <md-input v-model="api" readonly disabled></md-input>
        <span class="md-helper-text">note: this token is regenerated every 30 days.</span>
      </md-field>
    </md-card>
    <md-card class="card">
      <div>
        <md-field>
          <label>Full name</label>
          <md-input v-model="name"></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="email" readonly></md-input>
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
  </div>

</template>

<script>
import Auth from '@/containers/Auth';
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import { getCookie } from '../utils/cookie';

export default {
  name: 'Account',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
  },
  data() {
    return {
      apiUrl: 'http://api.restfulnews.com/',
      name: this.$store.state.auth.name,
      email: this.$store.state.auth.email,
      api: getCookie('jwt'),
      usage: 'Education',
      bio: 'None.',
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
.card {
  padding: 2em;
  margin-bottom: 2em;
}
@media (min-width: 600px) {
  #Account {
    width: 1000px;
  }
}
</style>
