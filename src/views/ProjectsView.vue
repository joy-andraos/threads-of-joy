<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative overflow-x-hidden">
    <div class="text-center mb-10">
      <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl relative inline-block mb-0">Projects</h1>
      <div class="projects-title-underline mx-auto mt-0"></div>
    </div>
    <div class="carousel-container">
      <swiper
        :modules="swiperModules"
        :effect="'coverflow'"
        :grab-cursor="true"
        :centered-slides="true"
        :slides-per-view="slidesPerView"
        :coverflow-effect="coverflowEffect"
        :pagination="{ clickable: true }"
        class="projects-swiper"
      >
        <swiper-slide v-for="project in projects" :key="project.id">
          <div class="project-card">
            <img :src="project.imageUrl" :alt="project.title" class="project-image" />
            <div class="project-info">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-technologies">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech" 
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-links">
                <a 
                  v-if="project.githubLink" 
                  :href="project.githubLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="github-logo"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: 'ProjectsView',
  components: {
    swiper: Swiper,
    'swiper-slide': SwiperSlide
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'Pothole Detection with YOLOv8',
          date: 'April 30, 2024',
          description: 'Optimizing the inference time of pothole detection on the Raspberry Pi 4 with YOLOv8.',
          technologies: ['Python', 'PyTorch', 'YOLOv8', 'Transfer Learning', 'Quantization'],
          imageUrl: '/projects/pothole.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/pothole-detection-optimization'
        },
        {
          id: 2,
          title: 'Lebanese Sign Language Translator',
          date: 'March 15, 2023',
          description: 'Meet Gesture Genius, the Lebanese Sign Language Translator Android App.',
          technologies: ['Python', 'Tensorflow', 'OpenCV', 'MediaPipe', 'Firebase', 'Android'],
          imageUrl: '/projects/gesture.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/GestureGenius'
        },
        {
          id: 3,
          title: 'Hand-written Digits Classification',
          date: 'February 7, 2023',
          description: "Exploring Convolutional Neural Networks (CNNs) to classify handwritten digits using the MNIST dataset.",
          technologies: ['Python', 'Tensorflow', 'Keras', 'Scikit-learn', 'NumPy'],
          imageUrl: '/projects/digits.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/Handwritten-Digit-Classification-Using-CNN'
        },
        {
          id: 4,
          title: 'Hand Sign Recognition',
          date: 'February 7, 2023',
          description: "This app can recognize these 4 hand gestures in real-time: Peace, Thumbs Up, Fist, and Open Palm.",
          technologies: ['Computer Vision', 'MediaPipe', 'Web APIs', 'JavaScript'],
          imageUrl: '/projects/handsign.png',
          status: 'completed',
          githubLink: 'https://github.com/joy-andraos/hand-sign-recognition'
        }
      ],
      swiperModules: [EffectCoverflow, Pagination, Navigation],
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      slidesPerView: 3,
    };
  },
  mounted() {
    this.updateSlidesPerView();
    window.addEventListener('resize', this.updateSlidesPerView);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateSlidesPerView);
  },
  methods: {
    updateSlidesPerView() {
      const width = window.innerWidth;
      if (width < 640) {
        this.slidesPerView = 1;
      } else if (width < 1024) {
        this.slidesPerView = 2;
      } else {
        this.slidesPerView = 3;
      }
    },
  },
  computed: {
    sliderStyle() {
      // Center the current letter above the ball
      const offset = this.letterWidth * this.spotlightIndex;
      return {
        transform: `translateX(-${offset}px)`,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    },
    ballStyle() {
      return {
        left: this.letterWidth / 2 + 'px',
      };
    },
  },
};
</script>

<style scoped>

.title-underline {
  height: 3px;
  width: 80px;
  background: linear-gradient(90deg, #2dc9a5 0%, #9ee4b7 50%, #2dc9a5 100%);
  margin: 0 auto;
  border-radius: 2px;
  position: relative;
}

.title-underline::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  border-radius: 2px;
}

.carousel-container {
  padding: 10px 0 4px 0;
}

.projects-swiper {
  width: 100%;
  min-height: 500px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08), 0 0 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  height: 450px;
  width: 350px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}

.project-card::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%);
  border-radius: 24px;
  z-index: -1;
  opacity: 0.9;
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.project-info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 10px;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.project-description {
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 16px;
  line-height: 1.5;
  flex: 1;
  font-weight: 400;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}

.tech-tag {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.project-links {
  position: relative;
  margin-top: auto;
}

.github-logo {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #4a5568;
  padding: 8px;
  border-radius: 8px;
  transition: color 0.2s ease;
}

.github-logo:hover {
  color: #2dc9a5;
}

/* Swiper navigation styling */
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  display: none !important;
}

:deep(.swiper-pagination-bullet) {
  background: #9ca3af;
  border: none;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 4px;
  transition: 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #222;
}

.projects-title-spotlight {
  position: relative;
  width: 2.2rem; /* Will be set dynamically to fit one letter */
  height: 2.7rem;
  overflow: hidden;
  margin-bottom: 8px;
}
.letters-slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.2rem;
  will-change: transform;
}
.project-title-letter {
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  color: #1a202c;
  width: 2rem;
  text-align: center;
  user-select: none;
}
.letter-active {
  color: #2dc9a5;
}
.letter-p {
  color: #1a202c !important;
}
.spotlight-ball {
  position: absolute;
  bottom: 0.2rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2dc9a5;
  left: 50%;
  transform: translateX(-50%);
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  pointer-events: none;
}

.projects-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-bottom: 8px;
}
.project-title-letter {
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  color: #1a202c;
  transition: transform 0.2s cubic-bezier(0.4,0,0.2,1);
  user-select: none;
}

@media (max-width: 768px) {
  .project-card {
    height: 400px;
    width: 90vw;
    max-width: 350px;
  }
  .project-image {
    height: 150px;
  }
  .project-info {
    padding: 15px;
  }
  .project-title {
    font-size: 1rem;
  }
  .project-description {
    font-size: 0.8rem;
  }
}

.projects-title-underline {
  height: 1.5px;
  width: 80px;
  background: #222;
  margin: 0 auto;
  border-radius: 2px;
  position: relative;
}
</style>