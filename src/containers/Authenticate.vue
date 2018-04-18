<template>
  <md-dialog :md-active.sync="showDialog">
    <md-card class="auth-card">
      <article v-if="getAuthErrorMsg" class="message is-danger wide">
        <div class="message-header">
          <p>Authentication Error</p>
          <button class="delete" aria-label="delete" />
        </div>
        <div class="message-body">
          {{getAuthErrorMsg}}
        </div>
      </article>
      <h3 class="subtitle">
        Log in to your <span class="site-title">RN account</span>
        to continue.
      </h3>
      <md-field  v-if="getAuthMode === 'signup'" md-clearable>
        <label>Name</label>
        <md-input id="name" v-model="name"></md-input>
      </md-field>
      <md-field md-clearable>
        <label>Email</label>
        <md-input id="email" v-model="email"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input id="password" v-model="password" type="password"></md-input>
      </md-field>
      <md-field v-if="getAuthMode === 'signup'">
        <label>Confirm Password</label>
        <md-input v-model="confirmPassword" type="password"></md-input>
      </md-field>
      <div class="md-layout">
        <div class="md-layout-item">
          <md-button class="md-raised md-primary wide"
            :disabled="getAuthMode === 'signup'"
            @click="_login()"
          >
            Login
          </md-button>
        </div>
        <div class="md-layout-item">
          <md-button class="md-raised md-clear wide"
            @click="_signup()"
          >
            Sign up
          </md-button>
        </div>
      </div>
    </md-card>
  </md-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Authenticate',
  computed: {
    ...mapGetters([
      'getAuthMode',
      'getAuthErrorMsg',
      'getAuthLoginStatus',
    ]),
    name: {
      get() { return this.$store.state.auth.name; },
      set(val) { this.updateAuthName(val); },
    },
    email: {
      get() { return this.$store.state.auth.email; },
      set(val) { this.updateAuthEmail(val); },
    },
    password: {
      get() { return this.$store.state.auth.password; },
      set(val) { this.updateAuthPassword(val); },
    },
    confirmPassword: {
      get() { return this.$store.state.auth.confirmPassword; },
      set(val) { this.updateAuthConfirmPassword(val); },
    },
    showDialog() {
      return !this.getAuthLoginStatus;
    },
  },
  methods: {
    ...mapActions([
      'updateAuthMode',
      'updateAuthName',
      'updateAuthEmail',
      'updateAuthPassword',
      'updateAuthConfirmPassword',
      'login',
      'signup',
    ]),
    _login() {
      this.login();
    },
    _signup() {
      if (this.getAuthMode === 'login') {
        this.updateAuthMode('signup');
      } else {
        this.signup();
      }
    },
  },
};
</script>

<style scoped>
.auth-card {
  width: 30em;
  padding: 2em;
}
.wide {
  width: 100%;
}
.site-title {
  font-size: .8em;
}
</style>
