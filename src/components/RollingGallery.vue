<template>
  <div class="gallery-container">
    <div class="gallery-gradient gallery-gradient-left"></div>
    <div class="gallery-gradient gallery-gradient-right"></div>
    <div class="gallery-content">
      <div
        ref="galleryTrack"
        class="gallery-track"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
        :style="trackStyle"
      >
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          class="gallery-item"
          :style="getItemStyle(i)"
        >
          <div class="project-card">
            <img :src="project.imageUrl" :alt="project.title" class="gallery-img" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RollingGallery',
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    projects: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isScreenSizeSm: window.innerWidth <= 640,
      rotation: 0,
      isDragging: false,
      startX: 0,
      currentX: 0,
      autoplayInterval: null,
      dragFactor: 0.05,
      velocity: 0,
      lastTime: 0
    }
  },
  computed: {
    cylinderWidth() {
      return this.isScreenSizeSm ? 1100 : 1800
    },
    faceCount() {
      return this.projects.length
    },
    faceWidth() {
      return this.cylinderWidth / this.faceCount
    },
    radius() {
      return this.cylinderWidth / (2 * Math.PI)
    },
    trackStyle() {
      return {
        transform: `rotate3d(0, 1, 0, ${this.rotation}deg)`,
        width: `${this.cylinderWidth}px`,
        transformStyle: 'preserve-3d'
      }
    }
  },
  methods: {
    getItemStyle(index) {
      return {
        width: `${this.faceWidth}px`,
        transform: `rotateY(${index * (360 / this.faceCount)}deg) translateZ(${this.radius}px)`
      }
    },
    startDrag(event) {
      this.isDragging = true
      this.startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX
      this.currentX = this.startX
      this.lastTime = Date.now()
      this.stopAutoplay()
    },
    onDrag(event) {
      if (!this.isDragging) return
      
      event.preventDefault()
      const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX
      const deltaX = clientX - this.currentX
      const currentTime = Date.now()
      const deltaTime = currentTime - this.lastTime
      
      this.velocity = deltaTime > 0 ? deltaX / deltaTime : 0
      this.currentX = clientX
      this.lastTime = currentTime
      
      this.rotation += deltaX * this.dragFactor
    },
    endDrag() {
      if (!this.isDragging) return
      
      this.isDragging = false
      
      // Apply spring animation like React version
      const targetRotation = this.rotation + this.velocity * this.dragFactor * 100
      this.animateToRotation(targetRotation)
      
      if (this.autoplay) {
        this.startAutoplay()
      }
    },
    animateToRotation(targetRotation) {
      const startRotation = this.rotation
      const startTime = Date.now()
      const duration = 1000
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Spring easing
        const springProgress = 1 - Math.pow(1 - progress, 3)
        
        this.rotation = startRotation + (targetRotation - startRotation) * springProgress
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    },
    handleMouseEnter() {
      if (this.autoplay && this.pauseOnHover) {
        this.stopAutoplay()
      }
    },
    handleMouseLeave() {
      if (this.autoplay && this.pauseOnHover) {
        this.startAutoplay()
      }
    },
    startAutoplay() {
      if (this.autoplayInterval) return
      
      this.autoplayInterval = setInterval(() => {
        this.rotation -= 360 / this.faceCount
      }, 2000)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
        this.autoplayInterval = null
      }
    },
    handleResize() {
      this.isScreenSizeSm = window.innerWidth <= 640
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    if (this.autoplay) {
      this.startAutoplay()
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.stopAutoplay()
  }
}
</script>

<style scoped>
.gallery-container {
  position: relative;
  height: 600px;
  width: 100%;
  overflow: hidden;
}

.gallery-gradient {
  position: absolute;
  top: 0;
  height: 100%;
  width: 48px;
  z-index: 10;
}

.gallery-gradient-left {
  left: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, #ffffff 100%);
}

.gallery-gradient-right {
  right: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, #ffffff 100%);
}

.gallery-content {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.gallery-track {
  display: flex;
  height: auto;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  cursor: grab;
  transform-style: preserve-3d;
  width: 100%;
  transition: transform 0.1s ease;
}

.gallery-track:active {
  cursor: grabbing;
}

.gallery-item {
  position: absolute;
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.project-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.3s ease;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.gallery-item:hover .project-card {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.gallery-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;
}

.project-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}

.project-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
  flex: 1;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
}

.tech-tag {
  background: #f0f0f0;
  color: #666;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .gallery-container {
    height: 500px;
  }
  
  .project-card {
    width: 220px;
    height: 350px;
  }
  
  .gallery-img {
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
</style> 