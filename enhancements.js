// Enhanced JavaScript Features

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
  initFloatingActions();
  initCounterAnimations();
  initProgressBars();
  initTooltips();
  initEnhancedFAQ();
  initTypewriter();
  initFormValidation();
  initLazyLoading();
  initSmoothReveal();
  initPricingToggle();
  initInteractiveElements();
});

// Floating Action Buttons
function initFloatingActions() {
  // Create floating actions container
  const floatingActions = document.createElement('div');
  floatingActions.className = 'floating-actions';
  
  // Scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'floating-btn scroll-top';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  
  // Contact button
  const contactBtn = document.createElement('button');
  contactBtn.className = 'floating-btn contact-float';
  contactBtn.innerHTML = '<i class="fas fa-envelope"></i>';
  contactBtn.setAttribute('aria-label', 'Contact us');
  
  floatingActions.appendChild(contactBtn);
  floatingActions.appendChild(scrollTopBtn);
  document.body.appendChild(floatingActions);
  
  // Show/hide scroll top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  // Scroll to top functionality
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Contact button functionality
  contactBtn.addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({
      behavior: 'smooth'
    });
  });
}

// Animated Counters
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
  const duration = 2000;
  const start = performance.now();
  const suffix = element.textContent.replace(/[\d]/g, '');
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(progress * target);
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Progress Bars
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  const observerOptions = {
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percentage = entry.target.getAttribute('data-percentage') || '85';
        entry.target.style.width = percentage + '%';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Enhanced Tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

// Parallax Effects for Service Cards
function initParallaxEffects() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    serviceCards.forEach((card, index) => {
      const rate = scrolled * -0.1 * (index + 1);
      card.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initProgressBars();
  initTooltips();
  initParallaxEffects();
});

function showTooltip(e) {
  const tooltipText = e.target.getAttribute('data-tooltip');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = tooltipText;
  tooltip.style.position = 'absolute';
  tooltip.style.background = 'var(--card-bg)';
  tooltip.style.color = 'var(--text)';
  tooltip.style.padding = '0.5rem 1rem';
  tooltip.style.borderRadius = '8px';
  tooltip.style.fontSize = '0.875rem';
  tooltip.style.border = '1px solid var(--card-border)';
  tooltip.style.zIndex = '10000';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.3s ease';
  
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
  
  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);
  
  e.target.tooltipElement = tooltip;
}

function hideTooltip(e) {
  if (e.target.tooltipElement) {
    e.target.tooltipElement.remove();
    e.target.tooltipElement = null;
  }
}

// Enhanced FAQ
function initEnhancedFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Typewriter Effect
function initTypewriter() {
  const typewriterElements = document.querySelectorAll('.typewriter');
  
  typewriterElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '3px solid var(--accent)';
    
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 100);
      } else {
        // Blinking cursor
        setInterval(() => {
          element.style.borderRightColor = element.style.borderRightColor === 'transparent' ? 'var(--accent)' : 'transparent';
        }, 500);
      }
    }
    
    // Start typing when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeChar, 500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
}

// Enhanced Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
        showToast('Please fill in all required fields correctly.', 'error');
      } else {
        showToast('Message sent successfully!', 'success');
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });
  });
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  // Remove existing error styling
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Check if required field is empty
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    showFieldError(field, 'This field is required');
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      showFieldError(field, 'Please enter a valid email address');
    }
  }
  
  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--error)';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  field.parentNode.appendChild(errorDiv);
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
}

// Smooth reveal animations
function initSmoothReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Smooth reveal animations
function initSmoothReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// Pricing Toggle Functionality
function initPricingToggle() {
  const pricingToggle = document.getElementById('pricing-toggle');
  const priceAmounts = document.querySelectorAll('.amount');
  
  if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
      priceAmounts.forEach(amount => {
        const currentPrice = parseInt(amount.textContent);
        if (this.checked) {
          // Annual pricing (20% discount)
          const annualPrice = Math.round(currentPrice * 12 * 0.8 / 12);
          amount.textContent = annualPrice;
        } else {
          // Monthly pricing - restore original
          const monthlyPrice = this.checked ? Math.round(currentPrice / 0.8) : currentPrice;
          amount.textContent = monthlyPrice;
        }
      });
    });
  }
}

// Interactive Elements
function initInteractiveElements() {
  // Interactive elements without animations - clean static style
  
  // Tech stack tag interactions
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach(tag => {
    tag.addEventListener('click', function() {
      showToast(`Learning more about ${this.textContent}...`, 'success');
    });
  });
}

// Styles without animations
const style = document.createElement('style');
style.textContent = `
  .field-error {
    display: block;
  }
  

  
  input.error, textarea.error {
    border-color: var(--error) !important;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
  }
`;
document.head.appendChild(style);