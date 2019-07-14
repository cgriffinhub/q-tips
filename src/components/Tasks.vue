<template>
<div>
<!--
<Panel title="Steps">
<CreateTaskRecord
      placeholder="Enter Something"
      @onInput="setNewTaskName"
      @change="setNewTaskName"
      :title="newTaskName"
      :description="newTaskDescription"
      :image="newTaskImage"
      @create="createTask"
    />    
  </Panel>
  -->
    <div
      class="tasks mt-2"
      v-for="(task) in tasks"
      :key="task.id"
    ><Panel :title="task.title">
    
      <EditableTaskRecord
        :isEditMode="task.isEditMode"
        :title="task.title"
        :description="task.description"
        :image="task.image"
        :task="task"
        @onInput="setTaskDescription({
          task
        })"
        @onEdit="setEditMode(task)"
        @onSave="saveTask(task)"
        @onDelete="deleteTask(task)"
      >
        <v-icon
          @click="checkClicked(task)">
          {{ task.completed ? 'check_box' : 'check_box_outline_blank'}}
        </v-icon>
      </EditableTaskRecord></Panel>
    </div>
  
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CreateTaskRecord from '@/components/CreateTaskRecord.vue';
import EditableTaskRecord from '@/components/EditableTaskRecord.vue';

export default {
  components: {
    CreateTaskRecord,
    EditableTaskRecord,
  },
  computed: {
    ...mapState('tasks', [
      'tasks',
      'newTaskName',
      'newTaskDescription',
      'newTaskImage',
    ]),
  },
  methods: {
    ...mapActions('tasks', [
      'createTask',
      'deleteTask',
      'saveTask',
    ]),
    ...mapMutations('tasks', [
      'setNewTaskName',
      'setNewTaskDescription',
      'setNewTaskImage',
      'setTaskDescription',
      'setEditMode',
      'toggleCompleted',
    ]),
    checkClicked(task) {
      this.toggleCompleted(task);
      this.saveTask(task);
    },
  },
};
</script>

<style>
</style>
