// ACCESSIBILITY ENHANCEMENTS

class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.addSkipLinks();
    this.enhanceKeyboardNavigation();
    this.addAriaLabels();
    this.manageFocus();
    this.addScreenReaderSupport();
  }

  addSkipLinks() {
    // Skip link removed per user request
  }

  enhanceKeyboardNavigation() {
    // Add visible focus indicators
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }
      
      .btn:focus,
      .service-card:focus,
      .pricing-card-enhanced:focus {
        outline: 3px solid var(--accent);
        outline-offset: 3px;
      }
    `;
    document.head.appendChild(style);
    
    // Add keyboard support for custom elements
    const interactiveElements = document.querySelectorAll('.service-card, .pricing-card-enhanced, .testimonial-card');
    
    interactiveElements.forEach(element => {
      element.setAttribute('tabindex', '0');
      element.setAttribute('role', 'button');
      
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  addAriaLabels() {
    // Add aria-labels to buttons without text
    const iconButtons = document.querySelectorAll('button:not([aria-label])');
    
    iconButtons.forEach(button => {
      const icon = button.querySelector('i');
      if (icon) {
        const iconClass = icon.className;
        let label = 'Button';
        
        if (iconClass.includes('bars')) label = 'Open menu';
        if (iconClass.includes('times')) label = 'Close';
        if (iconClass.includes('chevron')) label = 'Navigate';
        if (iconClass.includes('paper-plane')) label = 'Send message';
        
        button.setAttribute('aria-label', label);
      }
    });
    
    // Add aria-expanded to collapsible elements
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.setAttribute('aria-expanded', 'false');
    });
  }

  manageFocus() {
    // Focus management for modal/popup elements
    const chatbox = document.getElementById('chatbox');
    const chatInput = document.getElementById('chat-input');
    
    if (chatbox && chatInput) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            if (chatbox.classList.contains('open')) {
              setTimeout(() => chatInput.focus(), 100);
            }
          }
        });
      });
      
      observer.observe(chatbox, { attributes: true });
    }
  }

  addScreenReaderSupport() {
    // Add screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Announce page changes
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id.replace('-', ' ');
          announcer.textContent = `Now viewing ${sectionName} section`;
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
  }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
});