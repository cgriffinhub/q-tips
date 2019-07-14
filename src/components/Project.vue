<template>
<div class="row">

    <div class="col-sm-8">
      <EditableRecord
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

  
  
  <div class="col-sm-4">
  <qrcode-vue style="clear:both;" :value="value" :size="size" level="H"></qrcode-vue>
  </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CreateRecord from '@/components/CreateRecord.vue';
import EditableRecord from '@/components/EditableRecord.vue';
import QrcodeVue from 'qrcode.vue';
export default {
  mounted() {
    this.fetchProject(this.$route.params.id).then(() => {
          return this.fetchTasksForProject(this.project);
        });
  },
  data() {
    return {
      value: 'localhost:8080/'+this.$route.path,
      size: 300
    }
  },
  components: {
    CreateRecord,
    EditableRecord,
    QrcodeVue
  },
  computed: {
    ...mapState('projects', [
      'newProjectName',
      'projects',
      'project',
    ],),
  },
  methods: {
    projectClicked(project) {
      this.setCurrentProject(project);
      this.fetchTasksForProject(project);
    },
    ...mapMutations('projects', [
      'setNewProjectName',
      'setEditMode',
      'setProjectTitle',
      'setCurrentProject',
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetchProject',
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

.icon {
  cursor: pointer;
}

.icon:hover {
  color: #333;
}
</style>
