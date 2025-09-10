<template>
  <div class="photo-view-container">
    <!-- Quote Section -->
    <div class="quote-section">
      <h1 class="quote-title">pho•tog•ra•phy</h1>
      <p class="quote-subtitle">noun</p>
      <p class="quote-text">
        the art of freezing a moment in time, while time itself moves on, and the moment disappears
      </p>
    </div>

    <!-- Year Selector -->
    <div class="year-selector">
      <button 
        v-for="year in years" 
        :key="year" 
        @click="changeYear(year)"
        :class="{ active: selectedYear === year }"
        class="year-btn"
      >
        {{ year }}
      </button>
    </div>

    <!-- Photo Grid -->
    <div class="photo-grid">
      <div 
        v-for="photo in selectedYearPhotos" 
        :key="photo.url"
        class="photo-item"
        @click="openLightbox(photo)"
      >
        <img 
          :src="getOptimizedImageUrl(photo.url, 'thumb')"
          :srcset="getOptimizedImageSrcset(photo.url)"
          :sizes="getImageSizes()"
          :alt="photo.title"
          class="photo-image"
          :class="{ 'loaded': loadedImages.has(photo.url) }"
          loading="lazy"
          @load="onImageLoad(photo.url)"
          ref="photoRefs"
        />
        <div class="photo-overlay">
          <h3 class="photo-title">{{ photo.title }}</h3>
          <p class="photo-date">{{ photo.date }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <img 
          :src="currentPhoto.url"
          :alt="currentPhoto.title"
          class="lightbox-image"
          :class="{ 'loaded': loadedImages.has(currentPhoto.url) }"
          loading="eager"
          fetchpriority="high"
          @load="onImageLoad(currentPhoto.url)"
          @error="handleImageError"
        />
        <div class="lightbox-info">
          <div class="lightbox-title">{{ currentPhoto.title }}</div>
          <div class="lightbox-description">{{ currentPhoto.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoView',
  data() {
    const mostRecentYear = Math.max(...[2025, 2024, 2023, 2022, 2021]);
    return {
      selectedYear: mostRecentYear,
      lightboxOpen: false,
      currentPhotoIndex: 0,
      loadedImages: new Set(),
      observer: null,
      isMobile: false,
      years: [2025, 2024, 2023, 2022, 2021],
      photos: [
        {
          id: 1,
          url: '/photos/2021/taanayel1.jpeg',
          title: 'Taanayel',
          date: 'Jan 3, 2021',
          description: '1:44 PM',
          year: 2021
        },
        {
          id: 2,
          url: '/photos/2021/taanayel2.jpeg',
          title: 'Puddle',
          date: 'Jan 3, 2021',
          description: '1:49 PM',
          year: 2021
        },
        {
          id: 3,
          url: '/photos/2021/taanayel3.jpeg',
          title: 'Horses',
          date: 'Jan 3, 2021',
          description: '2:15 PM',
          year: 2021
        },
        {
          id: 4,
          url: '/photos/2021/zahle.jpeg',
          title: 'Zahle',
          date: 'May 22, 2021',
          description: '12:10 PM',
          year: 2021
        },
        {
          id: 5,
          url: '/photos/2022/turquoise.jpeg',
          title: 'Turquoise',
          date: 'May 28, 2022',
          description: '3:16 PM',
          year: 2022
        },
        {
          id: 6,
          url: '/photos/2022/cailloux.jpeg',
          title: 'Cailloux',
          date: 'May 28, 2022',
          description: '12:34 PM',
          year: 2022
        },
        {
          id: 7,
          url: '/photos/2022/chekka.jpeg',
          title: 'Chekka',
          date: 'Aug 26, 2022',
          description: '4:16 PM',
          year: 2022
        },
        {
          id: 8,
          url: '/photos/2022/summer.jpeg',
          title: 'Green Leaves',
          date: 'Aug 21, 2022',
          description: '5:50 PM',
          year: 2022
        },
        {
          id: 9,
          url: '/photos/2022/lau.jpeg',
          title: 'LAU',
          date: 'Sep 6, 2022',
          description: '9:35 AM',
          year: 2022
        },
        {
          id: 10,
          url: '/photos/2022/lausunset1.JPEG',
          title: 'LAU',
          date: 'Oct 5, 2022',
          description: '6:11 PM',
          year: 2022
        },
        {
          id: 11,
          url: '/photos/2022/lausunset2.JPEG',
          title: 'LAU',
          date: 'Oct 13, 2022',
          description: '5:57 PM',
          year: 2022
        },
        {
          id: 12,
          url: '/photos/2022/fall.jpeg',
          title: 'Fall',
          date: 'Oct 15, 2022',
          description: '3:30 PM',
          year: 2022
        },
        {
          id: 13,
          url: '/photos/2023/sunrise.jpeg',
          title: 'Sunrise',
          date: 'Jan 12, 2023',
          description: '6:34 AM',
          year: 2023
        },
        {
          id: 14,
          url: '/photos/2023/rain.jpeg',
          title: 'Rain Drops',
          date: 'Mar 19, 2023',
          description: '1:28 PM',
          year: 2023
        },
        {
          id: 15,
          url: '/photos/2023/raouche.JPEG',
          title: 'Pigeons Rock',
          date: 'Apr 5, 2023',
          description: '10:49 AM',
          year: 2023
        },
        {
          id: 15,
          url: '/photos/2023/moonblue.jpeg',
          title: 'Beirut',
          date: 'Apr 25, 2023',
          description: '7:58 PM',
          year: 2023
        },
        {
          id: 16,
          url: '/photos/2023/toureiffel.jpeg',
          title: 'Tour Eiffel',
          date: 'May 19, 2023',
          description: '10:20 PM',
          year: 2023
        },
        {
          id: 17,
          url: '/photos/2023/martinique.jpeg',
          title: 'Martinique',
          date: 'May 22, 2023',
          description: '6:28 PM',
          year: 2023
        },
        {
          id: 18,
          url: '/photos/2023/shoelsher.jpeg',
          title: 'La Place Schœlcher',
          date: 'May 22, 2023',
          description: '6:28 PM',
          year: 2023
        },
        {
          id: 19,
          url: '/photos/2023/starfish.jpeg',
          title: 'Patrick',
          date: 'Jun 4, 2023',
          description: '3:53 PM',
          year: 2023
        },
        {
          id: 20,
          url: '/photos/2023/moonblack.jpeg',
          title: 'Caribbean Nights',
          date: 'Jun 4, 2023',
          description: '6:55 PM',
          year: 2023
        },
        {
          id: 21,
          url: '/photos/2023/plane.jpeg',
          title: 'Space',
          date: 'Jun 7, 2023',
          description: '3:13 AM',
          year: 2023
        },
        {
          id: 22,
          url: '/photos/2023/dhour1.jpeg',
          title: 'Bois de Boulogne',
          date: 'Jun 17, 2023',
          description: '7:31 PM',
          year: 2023
        },
        {
          id: 23,
          url: '/photos/2023/dhour2.jpeg',
          title: 'Bois de Boulogne',
          date: 'Jun 17, 2023',
          description: '7:32 PM',
          year: 2023
        },
        {
          id: 24,
          url: '/photos/2023/dhour3.jpeg',
          title: 'Bois de Boulogne',
          date: 'Jul 23, 2023',
          description: '7:37 PM',
          year: 2023
        },
        {
          id: 25,
          url: '/photos/2023/night.jpeg',
          title: 'Night Lights',
          date: 'Aug 12, 2023',
          description: '8:14 PM',
          year: 2023
        },
        {
          id: 26,
          url: '/photos/2023/redroof.JPEG',
          title: 'Roof',
          date: 'Aug 13, 2023',
          description: '5:42 AM',
          year: 2023
        },
        {
          id: 27,
          url: '/photos/2023/halfmoon.jpeg',
          title: 'Moon',
          date: 'Sep 4, 2023',
          description: '10:40 PM',
          year: 2023
        },
        {
          id: 28,
          url: '/photos/2023/arz1.jpeg',
          title: 'Cedars of God',
          date: 'Aug 5, 2023',
          description: '7:31 PM',
          year: 2023
        },
        {
          id: 29,
          url: '/photos/2023/bcharre.jpeg',
          title: 'Bcharre',
          date: 'Jul 31, 2023',
          description: '7:34 PM',
          year: 2023
        },
        {
          id: 30,
          url: '/photos/2023/arz2.jpeg',
          title: 'La Jetée',
          date: 'Aug 16, 2023',
          description: '7:27 PM',
          year: 2023
        },
        {
          id: 31,
          url: '/photos/2023/bazoun.jpeg',
          title: 'Bazoun',
          date: 'Sep 30, 2023',
          description: '6:35 PM',
          year: 2023
        },
        {
          id: 32,
          url: '/photos/2024/lau.JPEG',
          title: 'LAU',
          date: 'Feb 22, 2024',
          description: '9:13 AM',
          year: 2024
        },
        {
          id: 33,
          url: '/photos/2024/spring.JPEG',
          title: 'Spring',
          date: 'Apr 16, 2024',
          description: '7:22 AM',
          year: 2024
        },
        {
          id: 34,
          url: '/photos/2024/cerise.JPEG',
          title: "Cerises",
          date: 'Jul 14, 2024',
          description: '9:55 AM',
          year: 2024
        },
        {
          id: 35,
          url: '/photos/2024/arz.JPEG',
          title: 'Cedars of God',
          date: 'Jul 14, 2024',
          description: '12:26 PM',
          year: 2024
        },
        {
          id: 36,
          url: '/photos/2025/boat.JPEG',
          title: 'Cotton Candy Sky',
          date: 'May 10, 2025',
          description: '7:35 PM',
          year: 2025
        },
        {
          id: 37,
          url: '/photos/2025/jetee.jpeg',
          title: 'La Jetée, again',
          date: 'July 12, 2025',
          description: '8:06 PM',
          year: 2025
        },
        {
          id: 38,
          url: '/photos/2025/stars1.jpeg',
          title: '34.0178126, 35.8417566',
          date: 'August 2, 2025',
          description: '10:36 PM',
          year: 2025
        },
        {
          id: 39,
          url: '/photos/2025/ehden.jpeg',
          title: 'Above the clouds',
          date: 'August 6, 2025',
          description: '7:53 PM',
          year: 2025
        },
        {
          id: 40,
          url: '/photos/2025/qadisha.jpeg',
          title: 'Qadisha Valley',
          date: 'August 12, 2025',
          description: '7:44 PM',
          year: 2025
        },
        {
          id: 41,
          url: '/photos/2025/clouds.jpeg',
          title: 'Above the clouds, again',
          date: 'August 16, 2025',
          description: '6:39 PM',
          year: 2025
        },
        {
          id: 42,
          url: '/photos/2025/stars2.jpeg',
          title: '34.2429345, 35.9827942',
          date: 'August 17, 2025',
          description: '2:37 AM',
          year: 2025
        },
        {
          id: 43,
          url: '/photos/2025/dive.jpeg',
          title: 'Somewhere Underwater',
          date: 'August 30, 2025',
          description: '12:33 PM',
          year: 2025
        }
      ]
    }
  },
  computed: {
    filteredPhotos() {
      return this.photos.filter(photo => photo.year === this.selectedYear);
    },
    selectedYearPhotos() {
      return this.filteredPhotos;
    },
    initialLoadCount() {
      return this.isMobile ? 6 : 12; // Load fewer images initially on mobile
    },
    currentPhoto() {
      return this.selectedYearPhotos[this.currentPhotoIndex] || {};
    }
  },
  mounted() {
    // Check if device is mobile
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);

    // Create intersection observer for better lazy loading
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const photoUrl = img.getAttribute('data-url');
            if (photoUrl) {
              img.src = this.getOptimizedImageUrl(photoUrl, this.isMobile ? 'thumb' : 'medium');
              img.srcset = this.getOptimizedImageSrcset(photoUrl);
              this.observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: this.isMobile ? '100px 0px' : '50px 0px',
        threshold: 0.1
      }
    );

    // Observe initial set of photos
    this.$nextTick(() => {
      if (this.$refs.photoRefs) {
        const initialPhotos = this.$refs.photoRefs.slice(0, this.initialLoadCount);
        initialPhotos.forEach(img => {
          img.setAttribute('data-url', img.getAttribute('src'));
          img.src = ''; // Clear src to prevent immediate loading
          this.observer.observe(img);
        });
      }
    });

    // Add keyboard event listener
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('resize', this.checkMobile);
    // Remove keyboard event listener
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    getOptimizedImageUrl(originalUrl, size) {
      return originalUrl;
    },
    getOptimizedImageSrcset(originalUrl) {
      return originalUrl;
    },
    getImageSizes() {
      return '100vw';
    },
    changeYear(year) {
      this.selectedYear = year;
      this.loadedImages.clear();
      this.lightboxOpen = false;
      
      // Re-observe images after year change
      this.$nextTick(() => {
        if (this.$refs.photoRefs) {
          const initialPhotos = this.$refs.photoRefs.slice(0, this.initialLoadCount);
          initialPhotos.forEach(img => {
            img.setAttribute('data-url', img.getAttribute('src'));
            img.src = ''; // Clear src to prevent immediate loading
            this.observer.observe(img);
          });
        }
      });
    },
    onImageLoad(url) {
      this.loadedImages.add(url);
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src);
      // Try to load the original image if the optimized version fails
      const originalUrl = event.target.src.replace('/photos-optimized', '');
      event.target.src = originalUrl;
    },
    openLightbox(photo) {
      this.currentPhotoIndex = this.selectedYearPhotos.findIndex(p => p.url === photo.url);
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
      
      // Preload the current image
      const img = new Image();
      img.src = photo.url;
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.style.overflow = '';
    },
    prevPhoto() {
      if (this.currentPhotoIndex > 0) {
        this.currentPhotoIndex--;
        this.preloadAdjacentImages();
      }
    },
    nextPhoto() {
      if (this.currentPhotoIndex < this.selectedYearPhotos.length - 1) {
        this.currentPhotoIndex++;
        this.preloadAdjacentImages();
      }
    },
    preloadAdjacentImages() {
      const nextIndex = this.currentPhotoIndex + 1;
      const prevIndex = this.currentPhotoIndex - 1;
      
      if (nextIndex < this.selectedYearPhotos.length) {
        const nextPhoto = this.selectedYearPhotos[nextIndex];
        this.preloadImage(nextPhoto.url);
      }
      
      if (prevIndex >= 0) {
        const prevPhoto = this.selectedYearPhotos[prevIndex];
        this.preloadImage(prevPhoto.url);
      }
    },
    preloadImage(url) {
      const img = new Image();
      img.src = url;
    },
    handleKeyPress(event) {
      if (!this.lightboxOpen) return;
      
      switch(event.key) {
        case 'ArrowLeft':
          this.prevPhoto();
          break;
        case 'ArrowRight':
          this.nextPhoto();
          break;
        case 'Escape':
          this.closeLightbox();
          break;
      }
    }
  }
}
</script>

<style scoped>
.photo-view-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: auto;
  margin-top: -10px;
}

/* Quote Section Styling */
.quote-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px 20px 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.quote-title {
  font-size: 2rem;
  margin-bottom: 4px;
  font-weight: 500;
  text-align: center;
  color: #1a202c;
  letter-spacing: -0.02em;
}

.quote-subtitle {
  font-size: 1rem;
  margin-bottom: 12px;
  font-style: italic;
  color: #64748b;
  text-align: center;
  font-weight: 400;
}

.quote-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #475569;
  text-align: center;
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto;
}

/* Year Selector Styling */
.year-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
}

.year-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  color: #64748b;
}

.year-btn:hover {
  background: #f0fdfa;
  border-color: #2dd4bf;
  color: #0f766e;
}

.year-btn.active {
  background: #0d9488;
  color: white;
  border-color: #0d9488;
}

/* Photo Grid Styling */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  height: 0;
  padding-bottom: 177.78%; /* 9:16 Aspect Ratio (portrait) */
  transition: all 0.3s ease;
}

.photo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.photo-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
  opacity: 0;
  filter: blur(8px);
}

.photo-item:hover .photo-image {
  transform: scale(1.05);
}

.photo-image.loaded {
  opacity: 1;
  filter: blur(0);
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.4));
  color: white;
  padding: 16px;
  transform: translateY(100%);
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}

.photo-item:hover .photo-overlay {
  transform: translateY(0);
}

.photo-title {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.photo-date {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.85;
  font-weight: 400;
}

/* Lightbox Styling */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.92);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  animation: fadeIn 0.3s ease-out;
}

.lightbox-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.lightbox-close {
  position: fixed;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.8rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
}

.lightbox-close:hover {
  background: rgba(45, 201, 165, 0.2);
  border-color: #2dc9a5;
  transform: scale(1.1) rotate(90deg);
}

.lightbox-image {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.lightbox-image.loaded {
  opacity: 1;
  filter: blur(0);
}

.lightbox-info {
  color: white;
  padding: 30px 0;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

.lightbox-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.lightbox-description {
  font-size: 1.1rem;
  opacity: 0.85;
  font-style: italic;
  font-weight: 400;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .photo-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    max-width: 700px;
  }
  
  .quote-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .photo-view-container {
    padding: 0 15px;
    margin-top: -10px;
  }
  
  .quote-section {
    margin-bottom: 30px;
    padding: 10px 15px 20px 15px;
  }
  
  .quote-title {
    font-size: 2rem;
  }
  
  .quote-text {
    font-size: 1rem;
    padding: 0 10px;
  }
  
  .year-selector {
    margin-bottom: 30px;
    gap: 8px;
  }
  
  .year-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
  
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    max-width: 400px;
  }
  
  .photo-item {
    padding-bottom: 177.78%; /* Keep 9:16 aspect ratio */
  }
  
  .photo-title {
    font-size: 0.8rem;
  }
  
  .photo-date {
    font-size: 0.7rem;
  }
  
  .lightbox-content {
    padding: 20px 15px;
  }
  
  .lightbox-close {
    top: 20px;
    right: 20px;
    font-size: 1.6rem;
    width: 45px;
    height: 45px;
  }
  
  .lightbox-image {
    max-height: 70vh;
  }
  
  .lightbox-info {
    padding: 20px 0;
  }
  
  .lightbox-title {
    font-size: 1.4rem;
  }
  
  .lightbox-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .photo-view-container {
    padding: 0 10px;
    margin-top: -10px;
  }
  
  .quote-section {
    margin-bottom: 25px;
    padding: 10px 10px 15px 10px;
  }
  
  .quote-title {
    font-size: 1.8rem;
  }
  
  .quote-text {
    font-size: 0.9rem;
  }
  
  .year-selector {
    margin-bottom: 25px;
    gap: 6px;
  }
  
  .year-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
  
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 300px;
  }
  
  .lightbox-content {
    padding: 15px 10px;
  }
  
  .lightbox-close {
    top: 15px;
    right: 15px;
    font-size: 1.4rem;
    width: 40px;
    height: 40px;
  }
  
  .lightbox-image {
    max-height: 65vh;
  }
  
  .lightbox-info {
    padding: 15px 0;
  }
  
  .lightbox-title {
    font-size: 1.2rem;
  }
  
  .lightbox-description {
    font-size: 0.9rem;
  }
}
</style>