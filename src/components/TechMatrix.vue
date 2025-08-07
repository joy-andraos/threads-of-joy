<template>
  <div :style="containerStyle" :class="className">
    <canvas ref="canvasRef" :style="canvasStyle" />
    <div v-if="showOverlay" :style="overlayStyle"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'

export default {
  name: 'TechMatrix',
  props: {
    className: {
      type: String,
      default: ''
    },
    animationSpeed: {
      type: Number,
      default: 50
    },
    showOverlay: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'matrix', // 'matrix', 'circuit', 'data-flow'
      validator: (value) => ['matrix', 'circuit', 'data-flow'].includes(value)
    },
    primaryColor: {
      type: String,
      default: '#00ff41'
    },
    secondaryColor: {
      type: String,
      default: '#008f11'
    },
    accentColor: {
      type: String,
      default: '#ffffff'
    }
  },
  setup(props) {
    const canvasRef = ref(null)
    const animationRef = ref(null)
    const context = ref(null)
    const particles = ref([])
    const connections = ref([])
    const time = ref(0)

    // Tech-related symbols and patterns
    const techSymbols = {
      matrix: ['01', '10', '11', '00', '█', '░', '▒', '▓']
    }

    const getRandomSymbol = () => {
      const symbols = techSymbols[props.theme]
      return symbols[Math.floor(Math.random() * symbols.length)]
    }

    const createParticle = (x, y) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        symbol: getRandomSymbol(),
        opacity: Math.random() * 0.8 + 0.2,
        size: Math.random() * 12 + 8,
        life: Math.random() * 100 + 50,
        maxLife: Math.random() * 100 + 50
      }
    }

    const createConnection = (p1, p2) => {
      return {
        p1,
        p2,
        opacity: Math.random() * 0.3 + 0.1,
        width: Math.random() * 2 + 1
      }
    }

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const interpolateColor = (start, end, factor) => {
      const result = {
        r: Math.round(start.r + (end.r - start.r) * factor),
        g: Math.round(start.g + (end.g - start.g) * factor),
        b: Math.round(start.b + (end.b - start.b) * factor),
      }
      return `rgb(${result.r}, ${result.g}, ${result.b})`
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.value
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return

      const dpr = window.devicePixelRatio || 1
      const rect = parent.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      if (context.value) {
        context.value.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      initializeParticles(rect.width, rect.height)
    }

    const initializeParticles = (width, height) => {
      particles.value = []
      connections.value = []
      
      // Create particles based on theme
      const particleCount = props.theme === 'matrix' ? 50 : props.theme === 'circuit' ? 30 : 40
      
      for (let i = 0; i < particleCount; i++) {
        particles.value.push(createParticle(
          Math.random() * width,
          Math.random() * height
        ))
      }

      // Create connections between nearby particles
      for (let i = 0; i < particles.value.length; i++) {
        for (let j = i + 1; j < particles.value.length; j++) {
          const p1 = particles.value[i]
          const p2 = particles.value[j]
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          
          if (distance < 100) {
            connections.value.push(createConnection(p1, p2))
          }
        }
      }
    }

    const updateParticles = () => {
      const canvas = canvasRef.value
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      
      particles.value.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= rect.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= rect.height) particle.vy *= -1
        
        // Update life
        particle.life -= 1
        if (particle.life <= 0) {
          particle.x = Math.random() * rect.width
          particle.y = Math.random() * rect.height
          particle.symbol = getRandomSymbol()
          particle.life = particle.maxLife
          particle.opacity = Math.random() * 0.8 + 0.2
        }
        
        // Update opacity based on life
        particle.opacity = (particle.life / particle.maxLife) * 0.8 + 0.2
      })
    }

    const drawParticles = () => {
      if (!context.value) return
      const ctx = context.value
      const canvas = canvasRef.value
      const rect = canvas.getBoundingClientRect()
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
      gradient.addColorStop(0, '#0a0a0a')
      gradient.addColorStop(1, '#000000')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, rect.width, rect.height)
      
      // Draw connections first
      connections.value.forEach(connection => {
        const p1 = connection.p1
        const p2 = connection.p2
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        
        if (distance < 100) {
          ctx.strokeStyle = props.primaryColor
          ctx.globalAlpha = connection.opacity * (1 - distance / 100)
          ctx.lineWidth = connection.width
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      })
      
      // Draw particles
      ctx.font = `${props.theme === 'matrix' ? 12 : 16}px monospace`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      
      particles.value.forEach(particle => {
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = props.primaryColor
        ctx.fillText(particle.symbol, particle.x, particle.y)
        
        // Add glow effect
        ctx.shadowColor = props.primaryColor
        ctx.shadowBlur = 10
        ctx.fillText(particle.symbol, particle.x, particle.y)
        ctx.shadowBlur = 0
      })
      
      ctx.globalAlpha = 1
    }

    const animate = () => {
      time.value += props.animationSpeed
      updateParticles()
      drawParticles()
      animationRef.value = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.value)
        resizeCanvas()
        animate()
      }, 100)
    }

    let resizeTimeout

    onMounted(() => {
      const canvas = canvasRef.value
      if (!canvas) return

      context.value = canvas.getContext('2d')
      resizeCanvas()
      animate()

      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      cancelAnimationFrame(animationRef.value)
      window.removeEventListener('resize', handleResize)
    })

    watch([() => props.theme, () => props.primaryColor, () => props.animationSpeed], () => {
      cancelAnimationFrame(animationRef.value)
      resizeCanvas()
      animate()
    })

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      overflow: 'hidden',
    }

    const canvasStyle = {
      display: 'block',
      width: '100%',
      height: '100%',
    }

    const overlayStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      background: 'radial-gradient(circle, rgba(0,0,0,0) 70%, rgba(0,0,0,0.8) 100%)',
    }

    return {
      canvasRef,
      containerStyle,
      canvasStyle,
      overlayStyle
    }
  }
}
</script> 