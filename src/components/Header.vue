<template>
  <header :class="[
    'shadow-md transition-colors duration-300 bg-gradient-to-r from-teal-100 to-green-200 text-black' 
  ]">
    <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:justify-between">
      <!-- Logo -->
      <div class="w-48 mb-4 md:mb-0 pl-8 md:pl-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 270" class="transform scale-125 md:scale-100">
          <path id="topArc" d="M 200,150 A 300,150 0 0,1 500,150" fill="none" />
          <text :fill="isDarkMode ? '#000000' : '#000000'" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" font-size="90" font-weight="500">
            <textPath href="#topArc" startOffset="50%" text-anchor="middle">
              Threads
            </textPath>
          </text>

          <path id="bottomArc" d="M 230,200 A 240,130 0 0,1 470,200" fill="none" />
          <text :fill="isDarkMode ? '#000000' : '#000000'" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" font-size="60" font-weight="500">
            <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
              of Joy
            </textPath>
          </text>
        </svg>
      </div>

      <!-- Navigation Menu - Centered on mobile, right-aligned on desktop -->
      <nav class="flex flex-row flex-wrap justify-center items-center space-x-4">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path" 
          :class="[
            'flex items-center space-x-2 transition-all duration-300 font-semibold relative group',
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
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </router-link>
        
      </nav>
    </div>
  </header>
</template>

<script>
import { Home, PenTool, Laptop, Camera } from 'lucide-vue-next'

export default {
  components: {
    Home,
    PenTool,
    Laptop,
    Camera
  },
  data() {
    return {
      navLinks: [
        { name: 'About', path: '/', icon: Home },
        { name: 'Projects', path: '/projects', icon: Laptop },
        // { name: 'Blog', path: '/blog', icon: PenTool }, // Blog link hidden for now
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
</style>