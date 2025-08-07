<template>
  <div
    ref="circularText"
    class="circular-text"
    :class="className"
    @mouseenter="handleHoverStart"
    @mouseleave="handleHoverEnd"
  >
    <span
      v-for="(letter, i) in letters"
      :key="i"
      :style="getLetterTransform(i)"
    >
      {{ letter }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CircularText',
  props: {
    text: {
      type: String,
      required: true
    },
    spinDuration: {
      type: Number,
      default: 20
    },
    onHover: {
      type: String,
      default: 'speedUp'
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rotation: 0,
      animationId: null,
      isHovered: false
    }
  },
  computed: {
    letters() {
      return Array.from(this.text)
    }
  },
  mounted() {
    this.startAnimation()
  },
  beforeUnmount() {
    this.stopAnimation()
  },
  methods: {
    getLetterTransform(index) {
      const rotationDeg = (360 / this.letters.length) * index
      const factor = Math.PI / this.letters.length
      const x = factor * index
      const y = factor * index
      const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`
      
      return {
        transform,
        WebkitTransform: transform
      }
    },
    
    getRotationTransition(duration, from, loop = true) {
      return {
        from,
        to: from + 360,
        ease: 'linear',
        duration,
        type: 'tween',
        repeat: loop ? Infinity : 0
      }
    },
    
    getTransition(duration, from) {
      return {
        rotate: this.getRotationTransition(duration, from),
        scale: {
          type: 'spring',
          damping: 20,
          stiffness: 300
        }
      }
    },
    
    startAnimation() {
      this.stopAnimation()
      const startTime = Date.now()
      const duration = this.isHovered ? this.getHoverDuration() : this.spinDuration
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = (elapsed / (duration * 1000))
        this.rotation = progress * 360
        
        this.animationId = requestAnimationFrame(animate)
      }
      
      this.animationId = requestAnimationFrame(animate)
    },
    
    getHoverDuration() {
      switch (this.onHover) {
        case 'slowDown':
          return this.spinDuration * 2
        case 'speedUp':
          return this.spinDuration / 4
        case 'goBonkers':
          return this.spinDuration / 20
        default:
          return this.spinDuration
      }
    },
    
    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
    },
    
    handleHoverStart() {
      this.isHovered = true
      this.startAnimation()
    },
    
    handleHoverEnd() {
      this.isHovered = false
      this.startAnimation()
    }
  }
}
</script>

<style scoped>
.circular-text {
  margin: 0 auto;
  border-radius: 50%;
  width: 200px;
  position: relative;
  height: 200px;
  font-weight: bold;
  color: #000;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  transform: rotate(v-bind(rotation + 'deg'));
  transition: transform 0.1s linear;
}

.circular-text span {
  position: absolute;
  display: inline-block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 24px;
  transition: all 0.5s cubic-bezier(0, 0, 0, 1);
}

/* Override styles for custom class */
.circular-text.custom-class {
  width: 70px !important;
  height: 70px !important;
}

.circular-text.custom-class span {
  font-size: 10px !important;
}
</style> 