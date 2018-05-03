<template>
  <div id="app">
    <div class="back">
   
      <md-card class="main-panel">
        <md-steppers md-sync-route md-dynamic-height>
          <md-step id="Analyse" to="/home" md-label="Analyse">
          </md-step>

          <md-step id="Refine" to="/refine" md-label="Refine">
          </md-step>

          <md-step id="Build" to="/build" md-label="Build">
          </md-step>
        </md-steppers>
        <md-app md-waterfall md-mode="fixed">
          <md-app-content class="content-section">
            <router-view/>
          </md-app-content>
        </md-app>

      </md-card>
    </div>
        
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'getAppTitle',
      'getAuthLoginStatus',
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
  data: () => ({
    menu: [
      { label: 'Explore', to: 'explore', icon: 'art_track' },
      { label: 'Bookmarks', to: 'bookmarks', icon: 'bookmark' },
      { label: 'Account', to: 'account', icon: 'account_circle' },
      { label: 'Home', to: 'home', icon: 'home' },
      { label: 'Refine', to: 'refine', icon: 'gesture' },
    ],
  }),
};
</script>

<style lang="scss">
.main-panel{
  margin: 40px;
}
.back{
  top:0%;
  background-color: slategrey;
}

@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(green, A200), // The primary color of your application
  accent: md-get-palette-color(blue, 500) // The accent or secondary color
  //theme: dark // This can be dark or light
));

@import "~vue-material/dist/theme/all"; // Apply the theme


</style>
