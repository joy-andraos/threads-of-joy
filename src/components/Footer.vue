<template>
  <footer class="bg-gradient-to-r from-teal-200 via-green-200 to-emerald-200 py-6 px-4 grid grid-cols-1 md:grid-cols-3 items-center shadow-lg">
    <div class="hidden md:block text-xs text-gray-600 font-normal text-left">
      Last update: September 10, 2025
    </div>
    <div class="flex justify-center items-center space-x-8">
      <!-- LinkedIn -->
      <a href="https://www.linkedin.com/in/joy-andraos-9aa53025b/" target="_blank" rel="noopener noreferrer" class="social-link linkedin">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" class="icon" aria-hidden="true">
          <path d="M22.23 0H1.77A1.75 1.75 0 0 0 0 1.75v20.5C0 23.22.78 24 1.77 24h20.46A1.75 1.75 0 0 0 24 22.25V1.75A1.75 1.75 0 0 0 22.23 0zM7.12 20.34H3.56V8.9h3.56v11.44zm-1.78-13a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11zM20.34 20.34h-3.56v-5.54c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91v5.64h-3.56V8.9h3.42v1.57h.05a3.75 3.75 0 0 1 3.38-1.86c3.62 0 4.29 2.38 4.29 5.47v6.26z" fill="currentColor"/>
        </svg>
      </a>

      <!-- GitHub -->
      <a href="https://github.com/joy-andraos" target="_blank" rel="noopener noreferrer" class="social-link github">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" class="icon" aria-hidden="true">
          <path d="M12 0a12 12 0 0 0-3.8 23.39c.6.1.8-.26.8-.57v-2c-3.34.72-4-1.62-4-1.62a3.16 3.16 0 0 0-1.33-1.75c-1.1-.75.08-.74.08-.74a2.5 2.5 0 0 1 1.86 1.25 2.55 2.55 0 0 0 3.49 1 2.6 2.6 0 0 1 .77-1.62C8.06 17.84 5 16.76 5 12.41a4.79 4.79 0 0 1 1.28-3.3 4.43 4.43 0 0 1 .12-3.25s1-.34 3.27 1.28a11.29 11.29 0 0 1 5.94 0c2.23-1.62 3.27-1.28 3.27-1.28a4.43 4.43 0 0 1 .12 3.25 4.79 4.79 0 0 1 1.28 3.3c0 4.36-3.06 5.42-5.98 5.71a2.89 2.89 0 0 1 .83 2.24v3.33c0 .3.2.67.8.56A12 12 0 0 0 12 0z" fill="currentColor"/>
        </svg>
      </a>

      <!-- Mail -->
      <a href="mailto:joyandraos344@gmail.com" target="_blank" rel="noopener noreferrer" class="social-link mail">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" class="icon" aria-hidden="true">
          <path d="M12 13.1a1.52 1.52 0 0 1-.8-.24L2 7.36V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7.36l-9.2 5.5a1.52 1.52 0 0 1-.8.24zm9.65-8.44a2 2 0 0 0-2-2H4.35a2 2 0 0 0-2 2L12 11.62z" fill="currentColor"/>
        </svg>
      </a>
    </div>
    <div class="block md:hidden mt-4 text-xs text-gray-600 font-normal text-center col-span-1">
      Last update: September 10, 2025
    </div>
    <div class="hidden md:block"></div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
footer {
  width: 100%;
  margin-top: auto;
}

/* Social icon hover animation inspired by Font Awesome hover effect */
.social-link {
  width: 56px;
  height: 56px;
  background: #ECFDF5; /* match light mint above footer */
  border-radius: 50%;
  border: 3px solid #ECFDF5;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 56px;
  z-index: 1;
  transition: transform .3s ease;
}

.social-link .icon {
  width: 28px;
  height: 28px;
  position: relative;
  color: #262626;
  fill: currentColor;
  transition: transform .5s ease, color .5s ease;
  z-index: 3;
}

.social-link:hover .icon {
  color: #ffffff;
  transform: rotateY(360deg);
}

.social-link::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  transition: top .5s ease;
  z-index: 2;
}

.social-link:hover::before {
  top: 0;
}

/* Brand colors */
.social-link.linkedin::before {
  background: #0077b5;
}

.social-link.github::before {
  background: #24292e;
}

.social-link.mail::before {
  background: #1e3a8a;
}

/* Fine-tune: nudge LinkedIn icon slightly right */
.social-link.linkedin .icon {
  transform: translateX(1px);
}

.social-link.linkedin:hover .icon {
  transform: translateX(1px) rotateY(360deg);
}
</style>