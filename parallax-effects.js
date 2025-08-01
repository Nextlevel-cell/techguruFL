// PARALLAX SCROLLING EFFECTS

class ParallaxManager {
  constructor() {
    this.elements = [];
    this.isScrolling = false;
    this.init();
  }

  init() {
    this.setupParallaxElements();
    this.bindScrollEvents();
    this.createParallaxLayers();
  }

  setupParallaxElements() {
    // Service section parallax
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      const speed = 0.5 + (index * 0.1); // Different speeds for each card
      this.elements.push({
        element: card,
        speed: speed,
        type: 'service-card',
        originalTransform: card.style.transform || ''
      });
    });

    // Service section background elements
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      // Create floating background elements
      this.createFloatingElements(servicesSection);
    }

    // Other parallax elements
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      this.elements.push({
        element: heroSection,
        speed: 0.3,
        type: 'hero-bg',
        originalTransform: ''
      });
    }

    const statsCards = document.querySelectorAll('.stat-card');
    statsCards.forEach((card, index) => {
      this.elements.push({
        element: card,
        speed: 0.7 + (index * 0.05),
        type: 'stat-card',
        originalTransform: card.style.transform || ''
      });
    });
  }

  createFloatingElements(container) {
    // Create background floating elements for services section
    const floatingElements = [];
    
    for (let i = 0; i < 8; i++) {
      const element = document.createElement('div');
      element.className = 'parallax-float-element';
      element.style.cssText = `
        position: absolute;
        width: ${20 + Math.random() * 40}px;
        height: ${20 + Math.random() * 40}px;
        background: linear-gradient(45deg, 
          rgba(99, 102, 241, ${0.1 + Math.random() * 0.2}), 
          rgba(139, 92, 246, ${0.1 + Math.random() * 0.2}));
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        z-index: -1;
        filter: blur(${1 + Math.random() * 2}px);
        animation: floatAnimation ${10 + Math.random() * 20}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      
      container.style.position = 'relative';
      container.appendChild(element);
      
      this.elements.push({
        element: element,
        speed: 0.2 + Math.random() * 0.3,
        type: 'float-element',
        originalTransform: ''
      });
    }
  }

  createParallaxLayers() {
    // Add CSS for floating animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatAnimation {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(90deg);
        }
        50% {
          transform: translateY(-10px) rotate(180deg);
        }
        75% {
          transform: translateY(-30px) rotate(270deg);
        }
      }

      .parallax-float-element {
        pointer-events: none;
        will-change: transform;
      }

      .service-card {
        will-change: transform;
        transition: transform 0.1s ease-out;
      }

      .parallax-active .service-card {
        transform-style: preserve-3d;
      }

      /* Enhanced service card parallax effects */
      .service-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(from 0deg at 50% 50%, 
          transparent 0deg, 
          rgba(99, 102, 241, 0.1) 90deg, 
          transparent 180deg, 
          rgba(139, 92, 246, 0.1) 270deg, 
          transparent 360deg);
        opacity: 0;
        transition: opacity 0.3s ease;
        animation: parallaxRotate 20s linear infinite;
        border-radius: inherit;
        z-index: -1;
      }

      .service-card.parallax-active::before {
        opacity: 1;
      }

      @keyframes parallaxRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* Service grid parallax container */
      .service-grid {
        transform-style: preserve-3d;
      }

      /* Individual service card depth effects */
      .service-card:nth-child(1) { z-index: 10; }
      .service-card:nth-child(2) { z-index: 9; }
      .service-card:nth-child(3) { z-index: 8; }
      .service-card:nth-child(4) { z-index: 7; }
      .service-card:nth-child(5) { z-index: 6; }
      .service-card:nth-child(6) { z-index: 5; }
    `;
    document.head.appendChild(style);
  }

  bindScrollEvents() {
    let ticking = false;

    const updateParallax = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateElements();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', () => {
      this.updateElements();
    });
  }

  updateElements() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    this.elements.forEach(item => {
      const rect = item.element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;

      // Check if element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        // Calculate parallax offset
        const scrollProgress = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
        const parallaxValue = (scrollY - elementTop) * item.speed;

        this.applyParallaxTransform(item, parallaxValue, scrollProgress);
      }
    });
  }

  applyParallaxTransform(item, parallaxValue, scrollProgress) {
    const { element, type, originalTransform } = item;

    switch (type) {
      case 'service-card':
        // Multi-dimensional parallax for service cards
        const rotateX = (scrollProgress - 0.5) * 10; // Slight 3D rotation
        const translateY = -parallaxValue;
        const translateZ = Math.sin(scrollProgress * Math.PI) * 20;
        
        element.style.transform = `
          ${originalTransform} 
          translateY(${translateY}px) 
          translateZ(${translateZ}px) 
          rotateX(${rotateX}deg)
        `;

        // Add/remove active class for enhanced effects
        if (scrollProgress > 0.2 && scrollProgress < 0.8) {
          element.classList.add('parallax-active');
        } else {
          element.classList.remove('parallax-active');
        }
        break;

      case 'float-element':
        // Floating background elements
        const floatY = -parallaxValue * 1.5;
        const floatX = Math.sin(scrollProgress * Math.PI * 2) * 20;
        const scale = 0.8 + (scrollProgress * 0.4);
        
        element.style.transform = `
          translate(${floatX}px, ${floatY}px) 
          scale(${scale})
        `;
        break;

      case 'hero-bg':
        // Hero background parallax
        element.style.transform = `
          ${originalTransform} 
          translateY(${-parallaxValue * 0.5}px)
        `;
        break;

      case 'stat-card':
        // Stats cards with subtle parallax
        const statTranslateY = -parallaxValue * 0.3;
        const statRotate = (scrollProgress - 0.5) * 2;
        
        element.style.transform = `
          ${originalTransform} 
          translateY(${statTranslateY}px) 
          rotate(${statRotate}deg)
        `;
        break;
    }
  }

  // Method to add custom parallax elements
  addElement(element, speed, type = 'custom') {
    this.elements.push({
      element: element,
      speed: speed,
      type: type,
      originalTransform: element.style.transform || ''
    });
  }

  // Method to remove parallax effect from an element
  removeElement(element) {
    this.elements = this.elements.filter(item => item.element !== element);
    element.style.transform = '';
  }

  // Method to pause/resume parallax effects
  toggle(enabled = true) {
    if (!enabled) {
      this.elements.forEach(item => {
        item.element.style.transform = item.originalTransform;
      });
    }
  }
}

// Enhanced service section interactions
function enhanceServiceParallax() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach((card, index) => {
    // Add mouse parallax effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      const rotateX = deltaY * -10;
      const rotateY = deltaX * 10;
      const translateZ = 20;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(${translateZ}px)
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // Add click ripple effect with parallax
    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, 
          rgba(99, 102, 241, 0.3) 0%, 
          transparent 70%);
        border-radius: 50%;
        left: ${x - 50}px;
        top: ${y - 50}px;
        transform: scale(0);
        animation: parallaxRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
      `;
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for the ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes parallaxRipple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Initialize parallax system
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other scripts to load
  setTimeout(() => {
    window.parallaxManager = new ParallaxManager();
    enhanceServiceParallax();
    
    // Add class to body to indicate parallax is active
    document.body.classList.add('parallax-enabled');
    
    console.log('Parallax scrolling initialized for service sections');
  }, 100);
});

// Disable parallax on mobile for better performance
if (window.matchMedia('(max-width: 768px)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.parallaxManager) {
      window.parallaxManager.toggle(false);
    }
  });
}