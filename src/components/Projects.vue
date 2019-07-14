<template>
  <Panel title="Projects">
    
    <CreateRecord
      placeholder="My project name...."
      @onInput="setNewProjectName"
      :value="newProjectName"
      @create="createProject"
    />
    <div
      class="project mt-2" style="text-align:left;"
      v-for="project in projects"
      :key="project.id"
    >
      <EditableProject
      class="clickable"
        :isEditMode="project.isEditMode" 
        :title="project.title"
        @onInput="setProjectTitle({
          project,
          title: $event,
        })"
        @onClick="projectClicked(project)"
        @onEdit="setEditMode(project)"
        @onSave="saveProject(project)"
        @onDelete="deleteProject(project)"
      />
    </div>
  </Panel>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CreateRecord from '@/components/CreateRecord.vue';
import EditableProject from '@/components/EditableProject.vue';
import router from '../router';
export default {
  mounted() {
    this.fetchProjects();
  },
  components: {
    CreateRecord,
    EditableProject,
  },
  computed: {
    ...mapState('projects', [
      'newProjectName',
      'projects',
    ]),
  },
  methods: {
    projectClicked(project) {
      return router.push('project/'+project.id);
    },
    ...mapMutations('projects', [
      'setNewProjectName',
      'setEditMode',
      'setProjectTitle',
      'setCurrentProject',
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetchProjects',
      'saveProject',
      'deleteProject',
    ]),
    ...mapActions('tasks', [
      'fetchTasksForProject',
    ]),
  },
};
</script>

<style>
.project {
  font-size: 24px;
}
.clickable {
  cursor: pointer;
}

.icon {
  cursor: pointer;
}

.icon:hover {
  color: #333;
}
</style>
