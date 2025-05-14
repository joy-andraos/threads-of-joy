<template>
  <div class="photo-view-container">
    <!-- Quote Section -->
    <div style="text-align: center; width: 100%; margin-bottom: 40px;">
      <h1 style="text-align: center; width: 100%; font-size: 2rem; font-weight: 500; margin-bottom: 5px;">pho•tog•ra•phy</h1>
      <p style="text-align: center; width: 100%; font-size: 1rem; font-style: italic; color: #555; margin-bottom: 15px;">noun</p>
      <p style="text-align: center; width: 100%; max-width: 800px; margin-left: auto; margin-right: auto; font-size: 1.2rem; line-height: 1.6; color: #333;" class="description-text">
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
        v-for="(photo, index) in filteredPhotos" 
        :key="photo.id" 
        class="photo-item"
        @click="openLightbox(photo)"
      >
        <img 
          :src="getOptimizedImageUrl(photo.url, 'thumb')"
          :srcset="getOptimizedImageSrcset(photo.url)"
          :sizes="getImageSizes()"
          :alt="photo.title" 
          class="photo-image"
          loading="lazy"
          @load="onImageLoad"
          @error="onImageError"
        >
        <div class="photo-overlay">
          <h3 class="photo-title">{{ photo.title }}</h3>
          <p class="photo-date">{{ photo.date }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox (Simple Version) -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <img 
          :src="getOptimizedImageUrl(currentPhoto.url, 'large')"
          :srcset="getOptimizedImageSrcset(currentPhoto.url)"
          :sizes="'90vw'"
          :alt="currentPhoto.title"
        >
        <div class="lightbox-caption">
          <h3>{{ currentPhoto.title }}</h3>
          <p>{{ currentPhoto.description }}</p>
          <p class="lightbox-date">{{ currentPhoto.date }}</p>
        </div>
        <button class="close-btn" @click="closeLightbox">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoView',
  data() {
    return {
      selectedYear: 2025,
      lightboxOpen: false,
      currentPhoto: null,
      years: [2025, 2024, 2023, 2022, 2021],
      loadedImages: new Set(),
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
          url: '/photos/2025/arz.jpeg',
          title: 'Cedars of God, again',
          date: 'Mar 16, 2025',
          description: '4:44 PM',
          year: 2025
        },
        {
          id: 37,
          url: '/photos/2025/boat.JPEG',
          title: 'Cotton Candy Sky',
          date: 'May 10, 2025',
          description: '7:35 PM',
          year: 2025
        },
      ]
    }
  },
  computed: {
    filteredPhotos() {
      return this.photos.filter(photo => photo.year === this.selectedYear);
    }
  },
  methods: {
    getOptimizedImageUrl(originalUrl, size) {
      const url = new URL(originalUrl, window.location.origin);
      const pathParts = url.pathname.split('/');
      const filename = pathParts.pop();
      const nameWithoutExt = filename.split('.')[0];
      const ext = filename.split('.').pop();
      
      // Map size to suffix
      const sizeMap = {
        thumb: '-thumb',
        medium: '-medium',
        large: '-large'
      };
      
      // Use WebP with JPEG fallback
      const webpUrl = `/photos-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.webp`)}`;
      const jpegUrl = `/photos-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.${ext}`)}`;
      
      return jpegUrl; // Fallback to JPEG
    },
    getOptimizedImageSrcset(originalUrl) {
      const sizes = ['thumb', 'medium', 'large'];
      const widthMap = {
        thumb: '400w',
        medium: '800w',
        large: '1600w'
      };
      
      return sizes.map(size => {
        const webpUrl = this.getOptimizedImageUrl(originalUrl, size).replace(/\.(jpe?g|png)$/, '.webp');
        const jpegUrl = this.getOptimizedImageUrl(originalUrl, size);
        return `${webpUrl} ${widthMap[size]}, ${jpegUrl} ${widthMap[size]}`;
      }).join(', ');
    },
    getImageSizes() {
      return '(max-width: 400px) 400px, (max-width: 800px) 800px, 1600px';
    },
    changeYear(year) {
      this.loadedImages.clear();
      this.selectedYear = year;
    },
    onImageLoad(event) {
      const img = event.target;
      this.loadedImages.add(img.src);
    },
    onImageError(event) {
      console.error('Failed to load image:', event.target.src);
    },
    openLightbox(photo) {
      this.currentPhoto = photo;
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.lightboxOpen = false;
      this.currentPhoto = null;
      document.body.style.overflow = '';
    }
  },
  beforeUnmount() {
    this.loadedImages.clear();
  }
}
</script>

<style scoped>
.photo-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Container for centering */
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Quote Section Styling */
.quote-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  max-width: 800px;
}

.quote-title {
  font-size: 2.5rem;
  margin-bottom: 5px;
  font-weight: 500;
  text-align: center;
}

.quote-subtitle {
  font-size: 1.2rem;
  margin-bottom: 15px;
  font-style: italic;
  color: #555;
  text-align: center;
}

.quote-text {
  font-size: 1.5rem;
  line-height: 1.6;
  color: #333;
  text-align: center;
}

/* Year Selector Styling */
.year-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  width: 100%;
}

.year-btn {
  padding: 8px 16px;
  margin: 0 8px 8px 0;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.year-btn:hover {
  background-color: #9ee4b7;
}

.year-btn.active {
  background-color: #333;
  color: white;
  border-color: #333;
}

/* Photo Grid Styling */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 0;
  padding-bottom: 177.78%; /* 16:9 Aspect Ratio (9:16 portrait) */
}

.photo-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-item:hover .photo-image {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.photo-item:hover .photo-overlay {
  transform: translateY(0);
}

.photo-title {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.photo-date {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Lightbox Styling */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  display: block;
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-caption {
  color: white;
  padding: 15px 0;
  text-align: center;
}

.lightbox-date {
  font-style: italic;
  opacity: 0.7;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

/* Responsive Adjustments */
.description-text {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .quote-title {
    font-size: 2rem;
  }
  
  .quote-text {
    font-size: 1.2rem;
  }

  .description-text {
    white-space: normal;
  }
}

@media (max-width: 480px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .quote-title {
    font-size: 1.8rem;
  }
  
  .quote-text {
    font-size: 1rem;
  }
}
</style>