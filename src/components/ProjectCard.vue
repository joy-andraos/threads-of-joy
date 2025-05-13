<template>
  <div>
    <article 
      class="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden relative group hover:-translate-y-1">     
      <div class="p-4">
        <h3 class="text-base font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{{ project.title }}</h3>
        <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>
      </div>
      
      <!-- Image with overlay on hover - reduced height -->
      <div class="relative overflow-hidden px-5">
        <img 
          :src="project.imageUrl" 
          :alt="project.title" 
          class="w-full h-40 object-cover rounded-md border border-gray-200 shadow-sm"
        />
      </div>
      
      <div class="p-5 pt-3 flex flex-col flex-grow">
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors duration-300"
          >
            {{ tech }}
          </span>
        </div>
        
        <!-- Date on left, icons on right -->
        <div class="mt-auto flex justify-between items-center">
          <!-- Date on the left -->
          <span v-if="project.date" class="text-gray-500 text-xs">
            {{ project.date }}
          </span>
          <!-- Empty span to maintain spacing when no date is present -->
          <span v-else></span>
          
          <!-- Icons on right -->
          <div class="flex space-x-3">
            <span 
              class="status-bubble font-medium rounded-full flex items-center justify-center"
              :class="{
                'bg-yellow-100 text-yellow-800': project.status === 'in progress',
                'bg-green-100 text-green-800': project.status === 'completed'
              }"
            >
              {{ project.status }}
            </span>
            <a 
              v-if="project.githubLink"
              :href="project.githubLink" 
              target="_blank"
              class="p-2 bg-gray-100 text-black rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center h-8"
              title="GitHub Repository"
            >
              <Github class="w-5 h-5" />
            </a>
            <span v-else class="p-2" style="visibility: hidden; width: 40px; display: inline-block; height: 32px;"></span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { Github, Star, GitFork } from 'lucide-vue-next'

export default {
  name: 'ProjectCard',
  components: {
    Github,
    Star,
    GitFork
  },
  props: {
    project: {
      type: Object,
      required: true,
      validator: (project) => {
        return project.title && 
               project.description && 
               project.technologies && 
               project.imageUrl;
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.status-bubble {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 32px;
  padding: 0;
  border-radius: 9999px;
  font-size: 15px;
  line-height: 1;
  text-align: center;
}
</style>