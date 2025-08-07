<template>
  <div class="about-page">
    <div class="profile-header">
      <TechMatrix
        theme="matrix"
        :animationSpeed="40"
        :showOverlay="true"
        primaryColor="#20c997"
        secondaryColor="#0d9488"
        accentColor="#ffffff"
        class="tech-matrix-bg"
      />
      <div class="profile-content">
        <div class="profile-photo">
          <img 
            :src="getOptimizedImageUrl(profileImage, 'thumb')"
            :srcset="getOptimizedImageSrcset(profileImage)"
            :sizes="getImageSizes()"
            alt="Profile"
            loading="eager"
            fetchpriority="high"
            @load="onImageLoad"
            class="profile-image"
            :class="{ 'loaded': imageLoaded }"
          />
        </div>
      </div>
    </div>
    
    <!-- Bio section -->
    <div class="bio-section text-center">
      <h2>Joy Andraos</h2>
      <div class="bio-content">
        <p class="intro text-center">
          AI Engineer | Tech Instructor
        </p>
        <div class="bio-container">
          <p>
            <Monitor class="inline-icon" />
            Hey, my name is Joy :) I hold a BS in Computer Science from the Lebanese American University.
          </p>
          <p>
            <Bot class="inline-icon" />
            I find my heart in building intelligent systems that can see and understand the world around us. My work focuses on deep learning and computer vision applications such as real-time object detection and sign language recognition systems.
          </p>
          <p>
            <GraduationCap class="inline-icon" />
            I'm currently a Tech Instructor at BMB Smart Academy, where I get to fulfill my love for sharing knowledge. I teach Python, Machine Learning and Deep Learning across all levels.
          </p>
          <p>
            <Camera class="inline-icon" />
            When I'm not coding, you'll find me either reading or capturing the beauty of the world around us. You can check out my projects and photographs on this website.
          </p>
          <p>
            <BookOpen class="inline-icon" />
            If you're into technology and love a good read, I'd love to connect with you!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileImage from '../assets/about/profile.jpeg'
import TechMatrix from '../components/TechMatrix.vue'
import { Monitor, Bot, GraduationCap, Camera, BookOpen } from 'lucide-vue-next'

export default {
  name: 'AboutPage',
  components: {
    TechMatrix,
    Monitor,
    Bot,
    GraduationCap,
    Camera,
    BookOpen
  },
  data() {
    return {
      profileImage,
      imageLoaded: false
    }
  },
  mounted() {
    // Preload critical images
    this.preloadImages([this.profileImage]);
  },
  methods: {
    preloadImages(urls) {
      urls.forEach(url => {
        const img = new Image();
        img.src = this.getOptimizedImageUrl(url, 'thumb');
      });
    },
    onImageLoad(event) {
      this.imageLoaded = true;
    },
    getOptimizedImageUrl(originalUrl, size) {
      // For profile and background images, use direct path
      return originalUrl;
    },
    getOptimizedImageSrcset(originalUrl) {
      // For now, just return the original URL
      return originalUrl;
    },
    getImageSizes() {
      return '100vw';
    }
  }
}
</script>

<style scoped>
.about-page {
  width: 100%;
  color: #333;
}

.profile-header {
  position: relative;
  height: 300px;
  margin-bottom: 0;
  padding-bottom: 60px;
}

.tech-matrix-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}



.profile-content {
  position: absolute;
  left: 50%;
  bottom: -40px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.profile-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background-color: #f0f0f0;
  position: relative;
  z-index: 30;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-photo:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bio-section {
  padding: 80px 40px 0px;
  background-color: transparent;
  margin-top: -30px;
  position: relative;
}

.bio-section h2 {
  color: #1a202c;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 25px;
  letter-spacing: -0.5px;
}

.bio-content {
  text-align: left;
}

.bio-content p {
  font-size: 20px;
  line-height: 1.7;
  color: #000000;
  margin-bottom: 20px;
  letter-spacing: 0.1px;
}

.bio-content .intro {
  font-size: 22px;
  font-weight: 500;
  color: #808080 !important;
  margin-bottom: 35px;
  text-align: center;
}

.bio-container {
  background-color: #000000;
  border-left: 4px solid #20c997;
  padding: 25px 30px;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 1000px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.bio-container p {
  margin-bottom: 20px;
  color: #e2e8f0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.inline-icon {
  color: #20c997;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.bio-container p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .profile-header {
    margin-bottom: 0;
  }
  
  .profile-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: 50%;
    bottom: -30px;
    transform: translateX(-50%);
    text-align: center;
  }
  
  .bio-section {
    padding: 100px 20px 10px;
    margin-top: -50px;
  }
  
  .bio-section h2 {
    font-size: 28px;
  }
  
  .bio-content p {
    font-size: 19px;
  }
  
  .intro {
    font-size: 20px;
  }
}

.profile-image {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  filter: blur(10px);
}

.profile-image.loaded {
  opacity: 1;
  filter: blur(0);
}
</style>