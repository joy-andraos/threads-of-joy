<template>
  <div id="app" :class="[
    'min-h-screen',
    'bg-gradient-to-br from-teal-50 to-green-30',
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
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: rgb(208, 243, 208);
}

::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 5px;
}
</style>