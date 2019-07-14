<template>
  <div>
    <v-flex class="">
    <div>
<span class="" style="font-size:2.5rem"
        @click="$emit('onClick')"
        v-if="!isEditMode">
        {{title}}
      </span>
      <span style="float:left;">
      <v-text-field
      class="centered-input"
        autofocus
        v-if="isEditMode"
        :value="title"
        @keyup.enter="$emit('onSave')"
        @input="$emit('onInput', $event)"
      ></v-text-field>
      </span>
      <span>
      <v-btn fab dark medium color="cyan" v-if="!isEditMode"
        @click="$emit('onEdit')">
      <v-icon dark>edit</v-icon>
    </v-btn>

    <v-btn fab dark medium color="green" v-if="isEditMode"
        @click="$emit('onSave')">
      <v-icon dark>check</v-icon>
    </v-btn>

<v-btn fab dark medium color="red" @click="$emit('onDelete')">
      <v-icon dark>delete</v-icon>
    </v-btn>
    </span>
      
      </div>
      <div>

</div>
      

      
    </v-flex>
    <v-flex class="text-xs-center">
      
    </v-flex>
  </div>
</template>

<script>
import CreateTaskRecord from '@/components/CreateTaskRecord.vue';
import EditableTaskRecord from '@/components/EditableTaskRecord.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  props: [
    'isEditMode',
    'title',
    'record',
  ],
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
.centered-input input {
      font-size: 2.5rem;
      padding:20px;
}
.title-area h1 {
}
.title-font {
  font-size:2.5rem;
  margin-left:20px;
  margin-top:32px;
}

</style>
