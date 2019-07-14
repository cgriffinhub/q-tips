// import router from '../router';
import Vue from 'vue';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskName: null,
    updateTaskName: null,
  },
  actions: {
    saveTask({ commit }, task) {
      console.log(task.image);
      return HTTP().patch(`tasks/${task.id}`, task)
        .then(() => {
          commit('unsetEditMode', task);
        });
    },
    deleteTask({ commit }, task) {
      return HTTP().delete(`tasks/${task.id}`)
        .then(() => {
          commit('removeTask', task);
        });
    },
    fetchTasksForProject({ commit }, project) {
      return HTTP().get(`projects/${project.id}/tasks`)
        .then(({ data }) => {
          commit('setTasks', data);
        });
    },
    createTask({ commit, state, rootState }) {
      state.newTaskName = document.getElementById("title").value;
      state.newTaskDescription = document.getElementById("description").value;
      state.newTaskImage = document.getElementById("image").getAttribute("image");
      return HTTP().post(`/projects/${rootState.projects.currentProject.id}/tasks`, {
        title: state.newTaskName,
        description: state.newTaskDescription,
        image: state.newTaskImage,
      })
        .then(({ data }) => {
          console.log(data);
          commit('appendTask', data);
          
        });
    },
  },
  getters: {
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setNewTaskName(state, newTaskName) {
      
      state.newTaskName = document.getElementById("title").value;
      state.newTaskDescription = document.getElementById("description").value;
      state.newTaskImage = document.getElementById("image").getAttribute("image");
      
    },
    appendTask(state, task) {
      state.tasks.push(task);
    },
    setTaskDescription(state, { task }) {
      
      task.title = document.getElementById("updateTitle").value;
      task.description = document.getElementById("updateDescription").value;
      task.image = document.getElementById("updateImage").getAttribute("image");
      console.log(document.getElementById("updateImage").getAttribute("image"));
    },
    setEditMode(state, task) {
      Vue.set(task, 'isEditMode', true);
    },
    unsetEditMode(state, task) {
      Vue.set(task, 'isEditMode', false);
    },
    removeTask(state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1);
    },
    toggleCompleted(state, task) {
      task.completed = !task.completed;
    },
  },
};
