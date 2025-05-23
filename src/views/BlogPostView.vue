<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="loading" class="text-center py-10">
        <p>Loading article...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-500">{{ error }}</p>
        <router-link to="/blog" class="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
          Return to blog
        </router-link>
      </div>
      
      <article v-else class="prose lg:prose-base mx-auto">
        <div class="flex justify-between items-baseline mb-4">
          <h1 class="text-xl md:text-2xl font-bold">{{ post.title }}</h1>
          <p class="text-sm text-gray-500 ml-4">{{ post.date }}</p>
        </div>
        
        <img 
          v-if="post.imageUrl" 
          :src="post.imageUrl" 
          :alt="post.title" 
          class="w-full h-48 md:h-64 object-cover object-center rounded-lg shadow-md mb-6"
        />
        
        <div v-html="post.content" class="mt-4"></div>
        
        <div class="mt-12 pt-8 border-t border-gray-200">
          <router-link to="/blog" class="text-emerald-600 hover:text-emerald-700">
            &larr; Back to all articles
          </router-link>
        </div>
      </article>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogPostView',
    data() {
      return {
        post: {},
        loading: true,
        error: null
      };
    },
    created() {
      this.fetchPost();
    },
    watch: {
      '$route.params.slug': 'fetchPost'
    },
    methods: {
      fetchPost() {
        this.loading = true;
        this.error = null;
        
        // Import the blog post content dynamically
        import(`../blog-content/${this.$route.params.slug}.js`)
          .then(module => {
            this.post = module.default;
            this.loading = false;
            document.title = `Threads of Joy | ${this.post.title}`;
          })
          .catch(err => {
            console.error('Failed to load blog post:', err);
            this.error = 'Failed to load the article. It may not exist or has been moved.';
            this.loading = false;
            document.title = 'Threads of Joy | Blog';
          });
      }
    }
  };
  </script>
  
  <style>
  .prose img {
    margin-left: auto;
    margin-right: auto;
  }
  
  .prose h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #000080;  /* Navy blue color */
  }
  
  .prose p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .prose ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .prose ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .prose li {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
    padding-left: 1rem;
  }
  
  .prose blockquote {
    border-left: 4px solid #10b981;
    padding-left: 0.75rem;
    font-style: italic;
    color: #4b5563;
    margin: 1rem 0;
    font-size: 0.875rem;
  }
  
  .prose p strong:first-child {
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #00008B !important;  /* Darker blue color with !important */
    display: block;
  }
  
  .prose p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .prose strong:not(:first-child) {
    font-weight: 600;
    color: inherit !important;  /* Force inherit for non-title strong elements */
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #00008B;
    display: block;
  }
  
  .prose a {
    color: #0645AD;
    text-decoration: underline;
    transition: color 0.2s;
  }
  .prose a:visited {
    color: #6f2da8;
  }
  .prose a:hover {
    color: #0b0080;
    text-decoration: underline;
  }
  </style>