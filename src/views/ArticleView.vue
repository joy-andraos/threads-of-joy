<template>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div v-if="article" class="prose lg:prose-xl mx-auto">
        <h1>{{ article.title }}</h1>
        <time class="text-gray-500 block mb-8">{{ article.date }}</time>
        
        <img 
          :src="article.imageUrl" 
          :alt="article.title" 
          class="w-full h-auto rounded-lg mb-8"
        />
        
        <div v-html="article.content"></div>
        
        <div class="mt-12 pt-8 border-t border-gray-200">
          <button 
            @click="$router.push({ name: 'BlogView' })" 
            class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-bold text-gray-800">Article not found</h2>
        <button 
          @click="$router.push({ name: 'BlogView' })" 
          class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Return to Blog
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArticleView',
    data() {
      return {
        articles: [
          {
            id: 1,
            title: 'Lorem ipsum dolor sit amet consectetur',
            date: 'April 2, 2025',
            imageUrl: '/blog1.png',
            content: `
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.</p>
              
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
              
              <h2>Subheading for Testing</h2>
              
              <p>Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.</p>
              
              <p>Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
              
              <h2>Another Section</h2>
              
              <p>Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</p>
              
              <p>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</p>
            `
          },
          // Add similar content for other article IDs (2-6)
          {
            id: 2,
            title: 'Sed do eiusmod tempor incididunt ut labore',
            date: 'March 28, 2025',
            imageUrl: '/blog2.png',
            content: `
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <h2>Main Concepts</h2>
              
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            `
          }
        ]
      };
    },
    computed: {
      article() {
        const id = parseInt(this.$route.params.id);
        return this.articles.find(article => article.id === id) || null;
      }
    }
  };
  </script>