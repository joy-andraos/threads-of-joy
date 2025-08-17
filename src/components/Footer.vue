<template>
  <footer class="bg-gradient-to-r from-teal-200 via-green-200 to-emerald-200 py-6 px-4 grid grid-cols-1 md:grid-cols-3 items-center shadow-lg">
    <div class="hidden md:block text-xs text-gray-600 font-normal text-left">
      Last update: August 17, 2025
    </div>
    <div class="flex justify-center items-center space-x-8">
      <!-- LinkedIn Logo -->
      <a href="https://www.linkedin.com/in/joy-andraos-9aa53025b/" target="_blank" rel="noopener noreferrer" class="group">
        <div class="p-2 transition-all duration-300 group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" class="w-8 h-8 transition-colors">
            <defs>
              <linearGradient id="linkedinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0077B5">
                  <animate attributeName="stop-color" 
                    values="#0077B5; #00a0dc; #4285F4; #0077B5" 
                    dur="1.5s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stop-color="#00a0dc">
                  <animate attributeName="stop-color" 
                    values="#00a0dc; #4285F4; #0077B5; #00a0dc" 
                    dur="1.5s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M22.23 0H1.77A1.75 1.75 0 0 0 0 1.75v20.5C0 23.22.78 24 1.77 24h20.46A1.75 1.75 0 0 0 24 22.25V1.75A1.75 1.75 0 0 0 22.23 0zM7.12 20.34H3.56V8.9h3.56v11.44zm-1.78-13a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11zM20.34 20.34h-3.56v-5.54c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91v5.64h-3.56V8.9h3.42v1.57h.05a3.75 3.75 0 0 1 3.38-1.86c3.62 0 4.29 2.38 4.29 5.47v6.26z" fill="url(#linkedinGradient)"/>
          </svg>
        </div>
      </a>
      
      <!-- GitHub Logo - Now with dark blue gradient -->
      <a href="https://github.com/joy-andraos" target="_blank" rel="noopener noreferrer" class="group">
        <div class="p-2 transition-all duration-300 group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" class="w-8 h-8 transition-colors">
            <defs>
              <linearGradient id="githubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1A365D">
                  <animate attributeName="stop-color" 
                    values="#1A365D; #2A4A7F; #3E64A0; #1A365D" 
                    dur="1.5s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stop-color="#2A4A7F">
                  <animate attributeName="stop-color" 
                    values="#2A4A7F; #3E64A0; #1A365D; #2A4A7F" 
                    dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M12 0a12 12 0 0 0-3.8 23.39c.6.1.8-.26.8-.57v-2c-3.34.72-4-1.62-4-1.62a3.16 3.16 0 0 0-1.33-1.75c-1.1-.75.08-.74.08-.74a2.5 2.5 0 0 1 1.86 1.25 2.55 2.55 0 0 0 3.49 1 2.6 2.6 0 0 1 .77-1.62C8.06 17.84 5 16.76 5 12.41a4.79 4.79 0 0 1 1.28-3.3 4.43 4.43 0 0 1 .12-3.25s1-.34 3.27 1.28a11.29 11.29 0 0 1 5.94 0c2.23-1.62 3.27-1.28 3.27-1.28a4.43 4.43 0 0 1 .12 3.25 4.79 4.79 0 0 1 1.28 3.3c0 4.36-3.06 5.42-5.98 5.71a2.89 2.89 0 0 1 .83 2.24v3.33c0 .3.2.67.8.56A12 12 0 0 0 12 0z" fill="url(#githubGradient)"/>
          </svg>
        </div>
      </a>
      
      <!-- Mail Logo - Now with black/white gradient -->
      <a href="mailto:joyandraos344@gmail.com" target="_blank" rel="noopener noreferrer" class="group">
        <div class="p-2 transition-all duration-300 group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" class="w-8 h-8 transition-colors">
            <defs>
              <linearGradient id="mailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#000000">
                  <animate attributeName="stop-color" 
                    values="#000000; #222222; #444444; #000000" 
                    dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stop-color="#555555">
                  <animate attributeName="stop-color" 
                    values="#555555; #333333; #111111; #555555" 
                    dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M12 13.1a1.52 1.52 0 0 1-.8-.24L2 7.36V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7.36l-9.2 5.5a1.52 1.52 0 0 1-.8.24zm9.65-8.44a2 2 0 0 0-2-2H4.35a2 2 0 0 0-2 2L12 11.62z" fill="url(#mailGradient)"/>
          </svg>
        </div>
      </a>
    </div>
    <div class="block md:hidden mt-4 text-xs text-gray-600 font-normal text-center col-span-1">
      Last update: August 17, 2025
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
</style>