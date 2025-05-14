<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-x-hidden">
    <div class="text-center mb-10">
      <h1 class="text-2xl font-medium text-gray-800 sm:text-3xl relative inline-block">Projects</h1>
      <div class="title-underline mx-auto mt-2"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id"
        :project="project"
        class="h-full"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue';

export default {
  name: 'ProjectsView',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'Lebanese / Dollar Expenses Tracker',
          date: 'May 10, 2025',
          description: 'Easily track your savings and expenses in LBP and USD, without the confusion of unstable rates.',
          technologies: ['React PWA', 'Firebase', 'TailwindCSS'],
          imageUrl: '/projects/lb-doll.png',
          status: 'in progress',
          githubLink: ''
        },
        {
          id: 2,
          title: 'AI-Powered Mock Interview Coach',
          date: 'April 17, 2025',
          description: 'Meet Jamie, your virtual Tech Interview coach. Practice mock interviews to land your dream job.',
          technologies: ['OpenAI', 'LLMS', 'Vue.js', 'TailwindCSS'],
          imageUrl: '/projects/voiceagent.png',
          status: 'in progress',
          githubLink: ''
        },
        {
          id: 3,
          title: 'Threads of Joy',
          date: 'May 12, 2025',
          description: "My personal website where you can find my projects, blogs and more. It's where you are now!",
          technologies: ['Vue.js', 'Tailwind CSS', 'Vite'],
          imageUrl: '/projects/portfolio.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/threads-of-joy'
        },
        {
          id: 4,
          title: 'Pothole Detection with YOLOv8',
          date: 'April 30, 2024',
          description: 'Optimizing the performance of pothole detection on the Raspberry Pi 4 with YOLOv8.',
          technologies: ['Python', 'PyTorch', 'YOLOv8', 'Transfer Learning'],
          imageUrl: '/projects/pothole.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/pothole-detection-optimization'
        },
        {
          id: 5,
          title: 'Lebanese Sign Language Translator',
          date: 'March 15, 2023',
          description: 'Meet Gesture Genius, the Lebanese Sign Language Translator Android App.',
          technologies: ['Tensorflow', 'Keras', 'OpenCV', 'Android'],
          imageUrl: '/projects/gesture.png',
          status: 'completed',
          githubLink: 'https://github.com/lea-ha/GestureGeniusApp'
        },
        {
          id: 6,
          title: 'Hand Sign Recognition',
          date: 'February 7, 2023',
          description: "This app can recognize in real-time four hand gestures: Peace, Thumbs Up, Fist, and Open Palm.",
          technologies: ['Computer Vision', 'MediaPipe', 'JavaScript'],
          imageUrl: '/projects/handsign.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/hand-sign-recognition'
        }
      ]
    };
  }
};
</script>

<style>
.title-underline {
  height: 1.5px;
  width: 100px;
  background-color:rgb(6, 167, 145);
  margin: 0 auto;
}
</style>