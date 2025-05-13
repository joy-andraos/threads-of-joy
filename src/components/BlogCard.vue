<template>
  <div class="blog-card">
    <router-link :to="'/blog/' + post.slug">
      <img 
        :src="post.imageUrl" 
        :alt="post.title" 
        class="w-full h-48 object-cover object-center rounded-lg shadow-md"
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