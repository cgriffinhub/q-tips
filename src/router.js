import Vue from 'vue';
import Router from 'vue-router';
import Projects from './views/Projects.vue';
import Project from './views/Project.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/project/:id',
      name: 'Project',
      component: Project,
    }
  ],
});
