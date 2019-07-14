<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <Project></Project>
      </v-flex>

    </v-layout>
    <p>&nbsp;</p>
<p>&nbsp;</p>
    <v-layout>
      <v-flex xs12 class="pl-4" v-if="">
      <h1 class="text-left text-large" >STEPS</h1>
        <Tasks></Tasks>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Project from '@/components/Project.vue';
import Tasks from '@/components/Tasks.vue';
import router from '../router';

export default {
  components: {
    Project,
    Tasks,
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('projects', [
      'currentProject',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
};
</script>
<style>
.text-large {
  font-size:6rem;
}
</style>