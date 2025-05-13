<template>
  <div class="aerial-silk-container">
    <!-- Quote Section -->
    <div class="quote-section">
      <h1 class="quote-text">❝ Don't let the fear of falling keep you from flying ❞</h1>
    </div>

    <!-- Photo Grid - Simple Version without Years or Titles -->
    <div class="photo-grid">
      <div 
        v-for="(photo, index) in photos" 
        :key="index" 
        class="photo-item"
        @click="openLightbox(photo)"
      >
        <img :src="photo.url" :alt="photo.alt" class="photo-image">
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <img :src="currentPhoto.url" :alt="currentPhoto.alt">
        <button class="close-btn" @click="closeLightbox">&times;</button>
        <div class="lightbox-nav">
          <button @click.stop="prevPhoto" class="nav-btn prev-btn">&lt;</button>
          <button @click.stop="nextPhoto" class="nav-btn next-btn">&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AerialSilkView',
  data() {
    return {
      lightboxOpen: false,
      currentPhotoIndex: 0,
      currentPhoto: null,
      // Sample photos - replace with your actual aerial silk photos
      photos: [
        {
          id: 1,
          url: '/path/to/aerial-silk1.jpg',
          alt: 'Aerial silk performance'
        },
        {
          id: 2,
          url: '/path/to/aerial-silk2.jpg',
          alt: 'Aerial silk pose'
        },
        {
          id: 3,
          url: '/path/to/aerial-silk3.jpg',
          alt: 'Aerial silk training'
        },
        {
          id: 4,
          url: '/path/to/aerial-silk4.jpg',
          alt: 'Aerial silk drop'
        },
        {
          id: 5,
          url: '/path/to/aerial-silk5.jpg',
          alt: 'Aerial silk wrap'
        },
        {
          id: 6,
          url: '/path/to/aerial-silk6.jpg',
          alt: 'Aerial silk performance'
        },
        {
          id: 7,
          url: '/path/to/aerial-silk7.jpg',
          alt: 'Aerial silk pose'
        },
        {
          id: 8,
          url: '/path/to/aerial-silk8.jpg',
          alt: 'Aerial silk performance'
        }
        // Add more photos as needed
      ]
    }
  },
  methods: {
    openLightbox(photo) {
      this.currentPhoto = photo;
      this.currentPhotoIndex = this.photos.findIndex(p => p.id === photo.id);
      this.lightboxOpen = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    },
    closeLightbox() {
      this.lightboxOpen = false;
      this.currentPhoto = null;
      document.body.style.overflow = ''; // Re-enable scrolling
    },
    nextPhoto() {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
      this.currentPhoto = this.photos[this.currentPhotoIndex];
    },
    prevPhoto() {
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
      this.currentPhoto = this.photos[this.currentPhotoIndex];
    }
  }
}
</script>

<style>
.aerial-silk-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Quote Section Styling */
.quote-section {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 20px;
}

.quote-text {
  font-size: 1.8rem;
  line-height: 1.4;
  font-weight: 300;
  color: #333;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Playfair Display', Georgia, serif;
  position: relative;
  white-space: nowrap;
}

.quote-text::before {
  font-family: 'Georgia', serif;
  font-size: 5rem;
  position: absolute;
  left: -40px;
  top: -30px;
  color: #c9c9c9;
  opacity: 0.7;
}

.quote-text::after {
  font-family: 'Georgia', serif;
  font-size: 5rem;
  position: absolute;
  right: -40px;
  bottom: -60px;
  color: #c9c9c9;
  opacity: 0.7;
}

/* Photo Grid Styling */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  height: 0;
  padding-bottom: 100%; /* 1:1 Aspect Ratio (square) */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.photo-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.photo-item:hover .photo-image {
  transform: scale(1.08);
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
  max-height: 85vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  outline: none;
}

.lightbox-nav {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 50%;
  transform: translateY(-50%);
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  transition: background 0.3s ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.prev-btn {
  margin-left: -60px;
}

.next-btn {
  margin-right: -60px;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  .quote-text {
    font-size: 1.8rem;
    white-space: normal;
  }
  
  .nav-btn {
    font-size: 1.5rem;
  }
  
  .prev-btn {
    margin-left: -30px;
  }
  
  .next-btn {
    margin-right: -30px;
  }
}

@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .quote-text {
    font-size: 1.5rem;
  }
  
  .quote-text::before {
    font-size: 3.5rem;
    left: -25px;
    top: -20px;
  }
  
  .quote-text::after {
    font-size: 3.5rem;
    right: -25px;
    bottom: -40px;
  }

  .quote-section {
    padding: 30px 15px;
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }
  
  .quote-text {
    font-size: 1.2rem;
  }
  
  .quote-text::before {
    font-size: 2.5rem;
    left: -15px;
    top: -15px;
  }
  
  .quote-text::after {
    font-size: 2.5rem;
    right: -15px;
    bottom: -30px;
  }
  
  .nav-btn {
    padding: 5px 10px;
    font-size: 1.2rem;
  }
  
  .prev-btn {
    margin-left: -15px;
  }
  
  .next-btn {
    margin-right: -15px;
  }
}
</style>