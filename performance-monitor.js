// WEBSITE PERFORMANCE MONITORING

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    this.observePageLoad();
    this.observeUserInteractions();
    this.optimizeImages();
    this.preloadCriticalResources();
  }

  observePageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        this.metrics.firstPaint = this.getFirstPaint();
        
        this.reportMetrics();
      }, 0);
    });
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : 0;
  }

  observeUserInteractions() {
    // Track click responsiveness
    document.addEventListener('click', (e) => {
      const startTime = performance.now();
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const responsiveness = endTime - startTime;
        
        if (responsiveness > 100) {
          console.warn('Slow interaction detected:', responsiveness + 'ms');
        }
      });
    });
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading="lazy" for images below the fold
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        img.loading = 'lazy';
      }
      
      // Optimize image loading
      img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.filter = 'none';
      });
      
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
    });
  }

  preloadCriticalResources() {
    const criticalResources = [
      '/static/css/styles.css',
      '/static/js/scripts.js',
      '/static/chat-avatar.png'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 
                resource.endsWith('.js') ? 'script' : 'image';
      document.head.appendChild(link);
    });
  }

  reportMetrics() {
    console.log('Performance Metrics:', this.metrics);
    
    // Send to analytics if needed
    if (window.gtag) {
      gtag('event', 'page_load_time', {
        value: Math.round(this.metrics.loadTime),
        custom_parameter: 'performance'
      });
    }
  }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
  new PerformanceMonitor();
});