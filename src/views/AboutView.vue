<template>
  <div class="about-page">
    <div class="profile-header">
      <div class="bg-image" :style="{ backgroundImage: `url(${bgImage})` }"></div>
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
    <div class="bio-section">
      <h2>About Me</h2>
      <div class="bio-content">
        <p class="greeting">
          My name is Joy <span class="emoji">:)</span> I hold a Bachelor of Science in Computer Science from the Lebanese American University. I'm enthusiastic about AI and full-stack development.
        </p>
        <p class="highlight">
          <span class="cta"> Threads of Joy</span> represents the intersection of logic and creativity where I find my own joy: the threads of code that power computers and the creative threads that tell stories and capture moments. 
        </p>
        <p>
          On this site, you'll find my coding projects, blog posts, and photographs; just click the icons in the header to explore. Feel free to look around and let's connect! If you're interested in getting my CV, you can reach out to me via LinkedIn or email (links below).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import profileImage from '../assets/about/profile.jpeg'
import bgImage from '../assets/about/bg.JPEG'

export default {
  name: 'AboutPage',
  data() {
    return {
      profileImage,
      bgImage,
      imageLoaded: false
    }
  },
  mounted() {
    // Preload critical images
    this.preloadImages([this.profileImage, this.bgImage]);
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
      if (originalUrl.includes('profile.jpeg') || originalUrl.includes('bg.JPEG')) {
        return originalUrl;
      }
      
      const url = new URL(originalUrl, window.location.origin);
      const pathParts = url.pathname.split('/');
      const filename = pathParts.pop();
      const nameWithoutExt = filename.split('.')[0];
      const ext = filename.split('.').pop();
      
      // Map size to suffix
      const sizeMap = {
        thumb: '-thumb',
        medium: '-medium'
      };
      
      // Use WebP with JPEG fallback
      const webpUrl = `/about-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.webp`)}`;
      const fallbackUrl = `/about-optimized${url.pathname.replace(filename, `${nameWithoutExt}${sizeMap[size]}.${ext}`)}`;
      
      return fallbackUrl; // Fallback to original format
    },
    getOptimizedImageSrcset(originalUrl) {
      const sizes = ['thumb', 'medium'];
      const widthMap = {
        thumb: '400w',
        medium: '800w'
      };
      
      return sizes.map(size => {
        const webpUrl = this.getOptimizedImageUrl(originalUrl, size).replace(/\.(jpe?g|png)$/, '.webp');
        const fallbackUrl = this.getOptimizedImageUrl(originalUrl, size);
        return `${webpUrl} ${widthMap[size]}, ${fallbackUrl} ${widthMap[size]}`;
      }).join(', ');
    },
    getImageSizes() {
      return '(max-width: 400px) 400px, 800px';
    }
  }
}
</script>

<style scoped>
.about-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.profile-header {
  position: relative;
  height: 300px;
  margin-bottom: 0;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.profile-content {
  position: absolute;
  bottom: 0px;
  left: 50px;
  display: flex;
  align-items: flex-end;
  z-index: 10;
}

.profile-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  position: relative;
  z-index: 20;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bio-section {
  padding: 60px 40px 40px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-top: -30px;
  position: relative;
}

.bio-section h2 {
  color: #222;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 15px;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}

.bio-content p {
  font-size: 19px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
  letter-spacing: 0.2px;
  position: relative;
}

.emoji {
  display: inline-block;
  transition: transform 0.3s ease;
}

.greeting:hover .emoji {
  transform: rotate(10deg);
}

.highlight {
  padding-left: 25px;
}

.highlight::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: rgb(45, 201, 165);
  border-radius: 2px;
}

.cta {
  margin-bottom: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .profile-header {
    margin-bottom: 0;
  }
  
  .profile-content {
    flex-direction: column;
    align-items: center;
    left: 0;
    right: 0;
    text-align: center;
  }
  
  .profile-info {
    margin-left: 0;
    margin-top: 10px;
  }
  
  .bio-section {
    padding: 80px 20px 40px;
    margin-top: -50px;
  }
  
  .bio-section h2 {
    font-size: 28px;
  }
  
  .bio-content p {
    font-size: 17px;
  }
  
  .highlight {
    padding-left: 20px;
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