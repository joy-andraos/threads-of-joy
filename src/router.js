import { createRouter, createWebHistory } from 'vue-router'
import AboutView from './views/AboutView.vue'
import ProjectsView from './views/ProjectsView.vue'
import PhotoView from './views/PhotoView.vue'

const routes = [
  { 
    path: '/', 
    component: AboutView,
    meta: {
      title: 'Joy of Dev | Home'
    }
  },
  { 
    path: '/projects', 
    component: ProjectsView,
    meta: {
      title: 'Joy of Dev | Projects'
    }
  },
  { 
    path: '/photos', 
    component: PhotoView,
    meta: {
      title: 'Joy of Dev | Photos'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Joy of Dev'
  next()
})

export default router