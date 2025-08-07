<template>
  <div>
    <article 
      class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden relative group hover:-translate-y-2 border border-gray-100">     
      <div class="p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">{{ project.title }}</h3>
        <p class="text-sm text-gray-600 mb-4 leading-relaxed">{{ project.description }}</p>
      </div>
      
      <!-- Image with overlay on hover - reduced height -->
      <div class="relative overflow-hidden px-6">
        <img 
          :src="getOptimizedImageUrl(project.imageUrl, 'thumb')"
          :srcset="getOptimizedImageSrcset(project.imageUrl)"
          :sizes="getImageSizes()"
          :alt="project.title" 
          class="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm project-image group-hover:scale-105 transition-transform duration-300"
          :class="{ 'loaded': imageLoaded }"
          loading="lazy"
          @load="onImageLoad"
          ref="imageRef"
        />
      </div>
      
      <div class="p-6 pt-4 flex flex-col flex-grow">
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-semibold rounded-full group-hover:from-emerald-100 group-hover:to-teal-100 group-hover:text-emerald-800 transition-all duration-300 border border-emerald-200"
          >
            {{ tech }}
          </span>
        </div>
        
        <!-- Date on left, icons on right -->
        <div class="mt-auto flex justify-between items-center">
          <!-- Date on the left -->
          <span v-if="project.date" class="text-gray-500 text-xs font-medium">
            {{ project.date }}
          </span>
          <!-- Empty span to maintain spacing when no date is present -->
          <span v-else></span>
          
          <!-- Icons on right -->
          <div class="flex space-x-3">
            <span 
              class="status-bubble font-semibold rounded-full flex items-center justify-center transition-all duration-300"
              :class="{
                'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200': project.status === 'in progress',
                'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200': project.status === 'completed'
              }"
            >
              {{ project.status }}
            </span>
            <a 
              v-if="project.githubLink"
              :href="project.githubLink" 
              target="_blank"
              class="p-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 transition-all duration-300 flex items-center justify-center h-8 border border-gray-300"
              title="GitHub Repository"
            >
              <Github class="w-4 h-4" />
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
  data() {
    return {
      imageLoaded: false,
      observer: null
    }
  },
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
  },
  mounted() {
    // Create intersection observer for better lazy loading
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = this.getOptimizedImageUrl(this.project.imageUrl, 'thumb');
            img.srcset = this.getOptimizedImageSrcset(this.project.imageUrl);
            this.observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (this.$refs.imageRef) {
      this.observer.observe(this.$refs.imageRef);
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true;
    },
    getOptimizedImageUrl(originalUrl, size) {
      const url = new URL(originalUrl, window.location.origin);
      const pathParts = url.pathname.split('/');
      const filename = pathParts.pop();
      const nameWithoutExt = filename.split('.')[0];
      const ext = filename.split('.').pop();
      
      // Map size to suffix
      const sizeMap = {
        thumb: '-thumb',
        medium: '-medium'
      };
      
      // Use WebP with PNG/JPEG fallback
      const webpUrl = `/projects-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.webp`)}`;
      const fallbackUrl = `/projects-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.${ext}`)}`;
      
      return fallbackUrl; // Fallback to original format
    },
    getOptimizedImageSrcset(originalUrl) {
      const sizes = ['thumb', 'medium'];
      const widthMap = {
        thumb: '400w',
        medium: '800w'
      };
      
      return sizes.map(size => {
        const webpUrl = this.getOptimizedImageUrl(originalUrl, size).replace(/\.(jpe?g|png)$/, '.webp');
        const fallbackUrl = this.getOptimizedImageUrl(originalUrl, size);
        return `${webpUrl} ${widthMap[size]}, ${fallbackUrl} ${widthMap[size]}`;
      }).join(', ');
    },
    getImageSizes() {
      return '(max-width: 400px) 400px, 800px';
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
  font-size: 13px;
  line-height: 1;
  text-align: center;
}

.project-image {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  filter: blur(10px);
}

.project-image.loaded {
  opacity: 1;
  filter: blur(0);
}
</style>