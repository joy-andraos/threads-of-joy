<template>
  <div id="app" :class="[
    'min-h-screen',
    'bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50',
    'flex',
    'flex-col',
    'overflow-x-hidden' /* Added this class to prevent horizontal overflow */
  ]">
    <Header />
    <main class="container mx-auto px-4 py-8 flex-grow w-full max-w-full">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scrolling at the document level */
  width: 100%;
  max-width: 100vw;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden; /* Reinforce no horizontal overflow */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #2dc9a5, #9ee4b7);
  border-radius: 6px;
  border: 2px solid #f0fdf4;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #059669, #2dc9a5);
}
</style>