<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-x-hidden">
    <div class="text-center mb-10">
      <h1 class="text-2xl font-medium text-gray-800 sm:text-3xl relative inline-block">Thoughts & Insights</h1>
      <div class="title-underline mx-auto mt-2"></div>
    </div>
    
    <!-- Blog post grid with improved spacing -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <BlogCard 
        v-for="post in posts" 
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue';

// Import all blog posts
import expectationsPost from '../blog-content/expectations-in-your-20s.js';
import findingPathPost from '../blog-content/attention-need.js';
import lessonsFromFailurePost from '../blog-content/discomfort-is-growth.js';

export default {
  name: 'BlogView',
  components: {
    BlogCard
  },
  data() {
    return {
      posts: [
        findingPathPost,
        expectationsPost,
        lessonsFromFailurePost
      ]
    };
  }
};
</script>

<style>
.prose img {
  margin-left: auto;
  margin-right: auto;
}

.title-underline {
  height: 2px;
  width: 100px;
  background-color: rgb(6, 167, 145);
  margin: 0 auto;
}
</style>