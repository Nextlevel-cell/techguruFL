// Scroll-triggered animations and visual enhancements
// Modern intersection observer-based animations

class ScrollAnimationManager {
  constructor() {
    this.observers = new Map();
    this.isEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (!this.isEnabled) return;
    
    this.setupIntersectionObserver();
    this.setupScrollReveal();
    this.setupParallaxElements();
    this.setupCounterAnimations();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);
  }

  setupScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );

    revealElements.forEach((element, index) => {
      // Add stagger delay if in container
      if (element.closest('.stagger-container')) {
        element.style.transitionDelay = `${index * 0.1}s`;
      }
      
      this.observer.observe(element);
    });
  }

  setupParallaxElements() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
      this.observer.observe(counter);
    });
  }

  animateElement(element) {
    if (element.classList.contains('scroll-reveal') ||
        element.classList.contains('scroll-reveal-left') ||
        element.classList.contains('scroll-reveal-right') ||
        element.classList.contains('scroll-reveal-scale')) {
      element.classList.add('revealed');
    }

    if (element.classList.contains('counter-number')) {
      this.animateCounter(element);
    }

    // Apply floating animation to cards
    if (element.classList.contains('service-card') ||
        element.classList.contains('pricing-card') ||
        element.classList.contains('testimonial-card')) {
      element.classList.add('floating-card');
    }

    // Add glass enhancement to cards
    if (element.classList.contains('card')) {
      element.classList.add('glass-enhanced');
    }
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target || element.textContent);
    const duration = parseInt(element.dataset.duration || 2000);
    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOutCubic);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // Method to add morphing blobs to sections
  addMorphingBlobs(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    sections.forEach(section => {
      if (section.querySelector('.morphing-blob')) return; // Already has blobs
      
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      
      // Add blob elements
      const blob1 = document.createElement('div');
      blob1.className = 'morphing-blob blob-1';
      
      const blob2 = document.createElement('div');
      blob2.className = 'morphing-blob blob-2';
      
      section.appendChild(blob1);
      section.appendChild(blob2);
    });
  }

  // Method to add tech grid pattern
  addTechGrid(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    sections.forEach(section => {
      if (section.querySelector('.tech-grid')) return; // Already has grid
      
      section.style.position = 'relative';
      
      const grid = document.createElement('div');
      grid.className = 'tech-grid';
      section.appendChild(grid);
    });
  }

  // Method to add circuit pattern
  addCircuitPattern(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    sections.forEach(section => {
      if (section.querySelector('.circuit-pattern')) return; // Already has pattern
      
      section.style.position = 'relative';
      
      const pattern = document.createElement('div');
      pattern.className = 'circuit-pattern';
      section.appendChild(pattern);
    });
  }

  // Performance monitoring
  checkPerformance() {
    // Disable animations on low-performance devices
    if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
      this.disable();
      return false;
    }

    // Check frame rate
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const checkFPS = (currentTime) => {
      frameCount++;
      
      if (currentTime >= lastTime + 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Disable animations if FPS is too low
        if (fps < 30) {
          this.disable();
          return;
        }
      }
      
      if (this.isEnabled) {
        requestAnimationFrame(checkFPS);
      }
    };

    requestAnimationFrame(checkFPS);
    return true;
  }

  disable() {
    this.isEnabled = false;
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Remove animation classes
    document.querySelectorAll('.floating-card, .glass-enhanced').forEach(element => {
      element.classList.remove('floating-card', 'glass-enhanced');
    });
  }

  enable() {
    this.isEnabled = true;
    this.init();
  }
}

// Enhanced button interactions
class ButtonEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.addRippleEffect();
    this.enhanceHoverEffects();
  }

  addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .cyber-btn, .btn-cta');
    
    buttons.forEach(button => {
      button.classList.add('btn-ripple');
      
      button.addEventListener('click', (e) => {
        this.createRipple(e, button);
      });
    });
  }

  createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  enhanceHoverEffects() {
    const interactiveElements = document.querySelectorAll('.card, .service-card, .pricing-card');
    
    interactiveElements.forEach(element => {
      element.classList.add('interactive-element');
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create global instances
  window.scrollAnimationManager = new ScrollAnimationManager();
  window.buttonEnhancer = new ButtonEnhancer();
  
  // Add visual enhancements to key sections
  setTimeout(() => {
    window.scrollAnimationManager.addMorphingBlobs('#hero, #pricing');
    window.scrollAnimationManager.addTechGrid('#services');
    window.scrollAnimationManager.addCircuitPattern('#contact');
    
    // Add animated gradient backgrounds
    document.querySelector('#hero')?.classList.add('animated-gradient', 'mesh-gradient');
    document.querySelector('#pricing')?.classList.add('animated-gradient');
    
    // Performance check
    window.scrollAnimationManager.checkPerformance();
  }, 1000);
});

// Add CSS keyframes for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ScrollAnimationManager, ButtonEnhancer };
}