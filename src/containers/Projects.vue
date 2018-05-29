<template>
  <md-tabs>
    <md-tab id="tab-websites" md-label="Websites" md-icon="web">
      <div v-if="userdetails.websites.length < 1">
        <md-empty-state
          md-icon="web"
          md-label="Create your first website"
          md-description="It seems like you don't have any saved websites yet.">
        <md-button class="md-primary md-raised" to="develop">Generate a website</md-button>
        </md-empty-state>
      </div>
        <website-card
          v-for="website in userdetails.websites"
          v-bind:website="website"
          :key="website.name"
        />
    </md-tab>
    <md-tab id="tab-models" md-label="Models" md-icon="group_work">
      <div v-if="userdetails.projects.length < 1">
      <md-empty-state
        md-icon="group_work"
        md-label="Create your first project"
        md-description="It seems like you don't have any saved projects/models yet yet.">
        <md-button class="md-primary md-raised" to="develop">Generate a Project</md-button>
      </md-empty-state>
      </div>
        <project-card
          v-for="project in userdetails.projects"
          v-bind:project="project"
          :key="project.projectid"
        />
    </md-tab>
  </md-tabs>
</template>

<script>
import axios from 'axios';
import Auth from '@/containers/Auth';
import { mapActions } from 'vuex';
import FeatureUnavailable from '@/components/FeatureUnavailable';
import WebsiteCard from '@/components/WebsiteCard';
import ProjectCard from '@/components/ProjectCard'

export default {
  name: 'Projects',
  components: {
    auth: Auth,
    'feature-unavailable': FeatureUnavailable,
    'website-card' : WebsiteCard,
    'project-card' : ProjectCard,
  },
  data() {
    return {
      userdetails: null,
      websites: [],
      models: []
    };
  },
  methods: {
    ...mapActions([
    'updateAppTitle',
    ]),
    getProjects() {
      axios
        .get(`${process.env.ANALYTICS_API_URI}/userdetails?user=${this.$store.state.auth.email}`)
        .then((response) => {
          this.userdetails = response.data;
          // Oliver - do thou wilt
          // access {{userdata.model}} from template
         })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.updateAppTitle('My Projects');
    this.getProjects();
  },
};
</script>

<style scoped>
</style>
