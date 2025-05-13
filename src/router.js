import { createRouter, createWebHistory } from 'vue-router'
import AboutView from './views/AboutView.vue'
import BlogView from './views/BlogView.vue'
import ProjectsView from './views/ProjectsView.vue'
import PhotoView from './views/PhotoView.vue'
import DanceView from './views/DanceView.vue'
import BlogPostView from './views/BlogPostView.vue'

const routes = [
  { 
    path: '/', 
    component: AboutView,
    meta: {
      title: 'Threads of Joy | Home'
    }
  },
  { 
    path: '/blog', 
    component: BlogView,
    meta: {
      title: 'Threads of Joy | Blog'
    }
  },
  { 
    path: '/projects', 
    component: ProjectsView,
    meta: {
      title: 'Threads of Joy | Projects'
    }
  },
  { 
    path: '/photos', 
    component: PhotoView,
    meta: {
      title: 'Threads of Joy | Photos'
    }
  },
  { 
    path: '/blog/:slug', 
    component: BlogPostView,
    meta: {
      title: 'Threads of Joy | Blog'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Threads of Joy'
  next()
})

export default router