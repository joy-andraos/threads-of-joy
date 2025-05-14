<template>
  <div class="blog-card">
    <router-link :to="'/blog/' + post.slug">
      <img 
        :src="getOptimizedImageUrl(post.imageUrl, 'thumb')"
        :srcset="getOptimizedImageSrcset(post.imageUrl)"
        :sizes="getImageSizes()"
        :alt="post.title" 
        class="w-full h-48 object-cover object-center rounded-lg shadow-md"
        loading="lazy"
      />
      
      <div class="pt-3 px-1">
        <div class="flex justify-between items-center mb-1">
          <p class="text-xs text-gray-500">{{ post.date }}</p>
          <span :class="categoryClasses" class="text-xs px-2 py-1 rounded-full">{{ post.category }}</span>
        </div>
        <h2 class="text-base font-bold text-gray-800 mb-1 line-clamp-2 title-with-underline" :class="titleClasses">{{ post.title }}</h2>
        <div class="title-underline" :class="underlineClasses"></div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
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
      const webpUrl = `/blogs-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.webp`)}`;
      const fallbackUrl = `/blogs-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.${ext}`)}`;
      
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
  },
  computed: {
    categoryClasses() {
      const baseClasses = 'text-xs px-2 py-1 rounded-full';
      switch (this.post.category) {
        case 'Tech':
          return `${baseClasses} bg-blue-100 text-blue-800`;
        case 'Life':
          return `${baseClasses} bg-purple-100 text-purple-800`;
        default:
          return `${baseClasses} bg-emerald-100 text-emerald-800`;
      }
    },
    titleClasses() {
      switch (this.post.category) {
        case 'Tech':
          return 'group-hover:text-blue-600';
        case 'Life':
          return 'group-hover:text-purple-600';
        default:
          return 'group-hover:text-emerald-600';
      }
    },
    underlineClasses() {
      switch (this.post.category) {
        case 'Tech':
          return 'bg-blue-600';
        case 'Life':
          return 'bg-purple-600';
        default:
          return 'bg-emerald-600';
      }
    }
  }
};
</script>

<style scoped>
.blog-card {
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.title-with-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  transition: color 0.3s ease;
}

.title-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.blog-card:hover .title-underline {
  transform: scaleX(1);
}
</style>