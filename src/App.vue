<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{title}}</span>
      </md-app-toolbar>
      <md-app-drawer class="md-elevation-4" md-permanent="full">
        <md-toolbar class="md-transparent site-title-container" md-elevation="0">
          <h2 class="site-title">{RN}</h2>
        </md-toolbar>
        <md-list class="main-navbar">
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
      <md-bottom-bar md-theme="bottom-bar-blue" md-mode="shift" md-sync-route>
        <md-bottom-bar-item v-for="item in menu" :key="item.label"
          :to="item.to" :md-label="item.label" :md-icon="item.icon">
        </md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'title',
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
  color: white;
}
.nav-item:hover {
  background-color: lightgrey;
}
.md-app {
  border: 1px solid rgba(#000, .12);
  max-height: 100vh;
}
.md-drawer {
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
</style>
