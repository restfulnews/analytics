<template>
  <div id="Bookmarks">
       <empty-404/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Empty404 from '@/components/Empty404';

export default {
  name: 'Bookmarks',
  components: {
    'empty-404': Empty404,
  },
  methods: mapActions([
    'updateAppTitle',
  ]),
  mounted() {
    this.updateAppTitle('Bookmarks');
  },
};
</script>

<style scoped>
</style>
