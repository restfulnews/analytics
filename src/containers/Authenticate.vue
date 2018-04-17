<template>
  <div id="Authenticate">
    <md-card class="auth-card">
      <span class="site-title login-header">{RN}</span>
      <md-field  v-if="getAuthMode === 'signup'" md-clearable>
        <label>Name</label>
        <md-input v-model="name"></md-input>
      </md-field>
      <md-field md-clearable>
        <label>Email</label>
        <md-input v-model="email"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
      <md-field v-if="getAuthMode === 'signup'">
        <label>Confirm Password</label>
        <md-input v-model="confirmPassword" type="password"></md-input>
      </md-field>
      <div class="md-layout">
        <div class="md-layout-item">
          <md-button class="md-raised md-primary auth-btn"
            :disabled="getAuthMode === 'signup'"
            @click="_login()"
          >
            Login
          </md-button>
        </div>
        <div class="md-layout-item">
          <md-button class="md-raised md-clear auth-btn"
            @click="_signup()"
          >
            Sign up
          </md-button>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Authenticate',
  computed: {
    ...mapGetters([
      'getAuthMode',
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
  },
  methods: {
    ...mapActions([
      'updateAuthMode',
      'updateAuthName',
      'updateAuthEmail',
      'updateAuthPassword',
      'updateAuthConfirmPassword',
      'login',
    ]),
    _login() {
      this.login();
    },
    _signup() {
      if (this.getAuthMode === 'login') {
        this.updateAuthMode('signup');
      }
    },
  },
};
</script>

<style scoped>
#Authenticate {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.auth-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30em;
  min-height: 30em;
  padding: 2em;
}
/* Mobile card */
@media only screen and (max-width: 600px) {
  .auth-card {
    width: 100%;
    height: 100%;
  }
}
.login-header {
  margin-bottom: 1em;
}
.auth-btn {
  width: 100%;
}
</style>
