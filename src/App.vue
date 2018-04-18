<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="site-toolbar">
        <h3 class="md-title" style="flex: 1">{{getAppTitle}}</h3>
        <md-button class="md-primary"
          v-if="getAuthLoginStatus"
          @click="logout">
          Log out
        </md-button>
      </md-app-toolbar>
      <md-app-drawer class="md-elevation-4 main-drawer" md-permanent="full">
        <md-toolbar class="md-transparent site-title-container" md-elevation="0">
          <h2 class="site-title">{RN}</h2>
        </md-toolbar>
        <md-list class="main-navbar mnav">
          <md-list-item v-for="item in menu" :key="item.to">
            <router-link :to="item.to" class="nav-item">
              <md-icon class="nav-icon md-size-2x">{{item.icon}}</md-icon>
              <span class="md-list-item-text">
                {{item.label}}
              </span>
            </router-link>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content class="content-section">
        <router-view/>
      </md-app-content>
    </md-app>
    <div class="phone-viewport md-elevation-12 mobile-bar">
      <router-link v-for="item in menu" :key="item.to" :to="item.to">
          <md-icon class="nav-icon md-size-2x">{{item.icon}}</md-icon>
          <span class="md-list-item-text">
            {{item.label}}
          </span>
      </router-link>
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
      { label: 'Home', to: '/', icon: 'home' },
      { label: 'Explore', to: 'explore', icon: 'art_track' },
      { label: 'Bookmarks', to: 'bookmarks', icon: 'bookmark' },
      { label: 'Account', to: 'account', icon: 'account_circle' },
    ],
  }),
};
</script>

<style>
.main-drawer {
  width: 8em;
}
.site-title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.site-title {
  font-weight: bold;
  font-size: 1.6em;
  color: white;
  background-color: #33a1e0;
  border-radius: 10%;
  padding: 0.3em;
}
.nav-item {
  background-color: #33a1e0 !important;
  color: white !important;
}
.nav-item .nav-icon {
  color: inherit !important;
}
.nav-item:hover {
  color: #33a1e0 !important;
  background-color: white !important;
}
.md-app {
  border: 1px solid rgba(#000, .12);
  max-height: 100vh;
}
.md-drawer {
  background-color: #33a1e0 !important;
  width: 100px;
  max-width: calc(100vw - 125px);
  height: 100vh;
}
/* Mobile Navbar */
@media (min-width: 600px) {
  .phone-viewport {
    display: none !important;
  }
}
/* Mobile toolbar */
@media only screen and (max-width: 600px) {
  .site-toolbar {
    display: none;
  }
}
.phone-viewport {
  border: 1px solid rgba(#000, .26);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  background-color: white;
}
/* Desktop Navbar */
.main-navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
}
.mnav {
  background-color: #33a1e0 !important;
}
.main-navbar .nav-item:hover {
  text-decoration: none;
}
.md-list-item-content {
  padding: 0;
}
.main-navbar .nav-item .nav-icon {
  text-align: center;
  color: #33a1e0;
}
.mobile-bar {
  display: flex;
  justify-content: space-around;
  text-align: center;
  color: #33a1e0 !important;
}
.mobile-bar .nav-icon {
  color: #33a1e0 !important;
}
.mobile-navbar a:active {
  text-decoration: none !important;
}

</style>
