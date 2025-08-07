<template>
  <header :class="[
    'shadow-lg transition-colors duration-300 bg-gradient-to-r from-teal-200 via-green-200 to-emerald-200 text-black' 
  ]">
    <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:justify-between">
      <!-- Logo -->
      <div class="w-full md:w-48 mb-4 md:mb-0 flex justify-center md:justify-start">
        <CircularText
          text="JOY•OF•DEV•"
          onHover="speedUp"
          :spinDuration="10"
          className="custom-class"
        />
      </div>

      <!-- Navigation Menu - Centered on mobile, right-aligned on desktop -->
      <nav class="flex flex-row flex-wrap justify-center md:justify-end items-center space-x-6">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path" 
          :class="[
            'flex items-center space-x-2 transition-all duration-300 font-semibold relative group px-4 py-2',
            'hover:text-black',
            { 'text-teal-600': $route.path === link.path }
          ]"
        >
          <!-- Icon -->
          <component 
            :is="link.icon" 
            class="w-5 h-5 mobile-pulse"
          />
          
          <!-- Text (hidden on small screens, visible on md and up) -->
          <span class="hidden md:inline relative">
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </router-link>
        
      </nav>
    </div>
  </header>
</template>

<script>
import { Home, Code, Camera } from 'lucide-vue-next'
import CircularText from './CircularText.vue'

export default {
  components: {
    Home,
    Code,
    Camera,
    CircularText
  },
  data() {
    return {
      navLinks: [
        { name: 'About', path: '/', icon: Home },
        { name: 'Projects', path: '/projects', icon: Code },
        { name: 'Photos', path: '/photos', icon: Camera },
      ]
    }
  },
  methods: {
    
  }
}
</script>

<style>
.status-bubble {
  font-size: 13px;
  line-height: 1;
  padding: 1px 6px;
}
@keyframes mini-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
@media (max-width: 640px) {
  .mobile-pulse:hover {
    animation: mini-pulse 0.4s cubic-bezier(0.4,0,0.2,1);
  }
}

.custom-class {
  width: 50px;
  height: 50px;
}

.custom-class span {
  font-size: 8px;
  font-weight: 700;
}
</style>