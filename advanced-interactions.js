// ADVANCED WEBSITE INTERACTIONS

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
  initMagneticElements();
  initScrollProgress();
  initSectionReveal();
  initNavigationDots();
  // initCursorTrail(); // Disabled cursor trail
  initSmoothScrolling();
  initHeaderEffects();
  initFormEnhancements();
  initPageTransitions();
});

// 1. Magnetic Cursor Effect
function initMagneticElements() {
  const magneticElements = document.querySelectorAll('.btn, .service-card, .pricing-card-enhanced');
  
  magneticElements.forEach(element => {
    element.classList.add('magnetic-element');
    
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.1;
      const moveY = y * 0.1;
      
      this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}

// 2. Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.transform = `scaleX(${scrolled / 100})`;
  });
}

// 3. Section Reveal Animation
function initSectionReveal() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// 4. Navigation Dots
function initNavigationDots() {
  const sections = document.querySelectorAll('section[id]');
  const navDots = document.createElement('div');
  navDots.className = 'nav-dots';
  
  sections.forEach((section, index) => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    dot.setAttribute('data-section', section.id);
    
    dot.addEventListener('click', function() {
      section.scrollIntoView({ behavior: 'smooth' });
    });
    
    navDots.appendChild(dot);
  });
  
  document.body.appendChild(navDots);
  
  // Update active dot on scroll
  window.addEventListener('scroll', updateActiveDot);
}

function updateActiveDot() {
  const sections = document.querySelectorAll('section[id]');
  const dots = document.querySelectorAll('.nav-dot');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
    if (dot.getAttribute('data-section') === current) {
      dot.classList.add('active');
    }
  });
}

// 5. Cursor Trail Effect
function initCursorTrail() {
  // Cursor trail removed per user request
}

// 6. Enhanced Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 7. Dynamic Header Effects
function initHeaderEffects() {
  const header = document.querySelector('.site-header');
  let lastScrollY = window.pageYOffset;
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// 8. Enhanced Form Interactions
function initFormEnhancements() {
  const formInputs = document.querySelectorAll('.contact-form-glass input, .contact-form-glass textarea');
  
  formInputs.forEach(input => {
    // Add focus/blur effects
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      if (this.value.trim() !== '') {
        this.parentElement.classList.add('filled');
      } else {
        this.parentElement.classList.remove('filled');
      }
    });
    
    // Add typing animation
    input.addEventListener('input', function() {
      if (this.value.length > 0) {
        this.style.borderColor = 'var(--accent)';
      } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });
  });
}

// 9. Page Transition Effects
function initPageTransitions() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  
  // Add transition for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        transition.classList.add('active');
        
        setTimeout(() => {
          transition.classList.remove('active');
        }, 500);
      }
    });
  });
}

// 10. Cyberpunk Effects Initialization
function initCyberpunkEffects() {
  console.log('Cyberpunk effects initialized');
  
  // Add random glitch effects to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = `glitchEffect 0.3s ease-in-out`;
      setTimeout(() => {
        card.style.animation = '';
      }, 300);
    }, index * 200);
  });
  
  // Add floating animation to pricing cards
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach((card, index) => {
    card.style.animation = `floatUp 3s ease-in-out infinite`;
    card.style.animationDelay = `${index * 0.5}s`;
  });
}

// Add glitch keyframes
const glitchStyles = `
@keyframes glitchEffect {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(1px, -1px); }
  60% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = glitchStyles;
document.head.appendChild(styleSheet);

// 11. Performance Optimization
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Optimize animations for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.setProperty('--animation-duration', '0.01ms');
  }
}

// 11. Advanced Keyboard Navigation
function initKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const sections = document.querySelectorAll('section[id]');
      const currentSection = getCurrentSection();
      let nextIndex = 0;
      
      sections.forEach((section, index) => {
        if (section.id === currentSection) {
          nextIndex = e.key === 'ArrowDown' ? 
            Math.min(index + 1, sections.length - 1) : 
            Math.max(index - 1, 0);
        }
      });
      
      sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function getCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      current = section.id;
    }
  });
  
  return current;
}

// 12. Dynamic Theme Adaptation
function initDynamicTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function updateTheme(e) {
    if (e.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
  
  prefersDark.addEventListener('change', updateTheme);
  updateTheme(prefersDark);
}

// Initialize all advanced features
initPerformanceOptimizations();
initKeyboardNavigation();
initDynamicTheme();