// import router from '../router';
import Vue from 'vue';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    projects: [],
    project: [],
    currentProject: null,
    newProjectName: null,
  },
  actions: {
    saveProject({ commit }, project) {
      return HTTP().patch(`projects/${project.id}`, project)
        .then(() => {
          commit('unsetEditMode', project);
        });
    },
    deleteProject({ commit }, project) {
      return HTTP().delete(`projects/${project.id}`)
        .then(() => {
          commit('removeProject', project);
          window.location.href = '/';
        });

    },
    fetchProjects({ commit }) {
      return HTTP().get('/projects')
        .then(({ data }) => {
          commit('setProjects', data);
        });
    },
    fetchProject({ commit }, param) {
      return HTTP().get(`projects/${param}`)
        .then((response) => {
          commit('setProject', response.data);
        });
    },
    createProject({ commit, state }) {
      return HTTP().post('/projects', {
        title: state.newProjectName,
      })
        .then(({ data }) => {
          commit('appendProject', data);
          commit('setNewProjectName', null);
        });
    },
  },
  getters: {
  },
  mutations: {
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
    setNewProjectName(state, name) {
      state.newProjectName = name;
    },
    appendProject(state, project) {
      state.projects.push(project);
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setProject(state, project) {
      state.project = project;
    },
    setProjectTitle(state, { project, title }) {
      project.title = title;
    },
    setEditMode(state, project) {
      Vue.set(project, 'isEditMode', true);
    },
    unsetEditMode(state, project) {
      Vue.set(project, 'isEditMode', false);
    },
    removeProject(state, project) {
      state.projects.splice(state.projects.indexOf(project), 1);
    },
  },
};
