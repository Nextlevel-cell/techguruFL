// tsParticles Configuration for TechGuru Website
// Tech-themed particle system with geometric shapes and connecting lines

const particlesConfig = {
  // Hero section particles - floating geometric shapes with connecting lines
  hero: {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#3b82f6", "#8b5cf6", "#06b6d4"]
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        stroke: {
          width: 1,
          color: "#ffffff20"
        },
        polygon: {
          nb_sides: 6
        },
        triangle: {
          nb_sides: 3
        }
      },
      opacity: {
        value: 0.4,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#3b82f6",
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 0.6
          }
        },
        push: {
          particles_nb: 3
        }
      }
    },
    retina_detect: true
  },

  // Services section - circuit pattern with data streams
  services: {
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: "#3b82f6"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true
      },
      size: {
        value: 2,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 180,
        color: "#3b82f6",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "connect"
        },
        resize: true
      },
      modes: {
        connect: {
          distance: 80,
          line_linked: {
            opacity: 0.5
          },
          radius: 60
        }
      }
    },
    retina_detect: true
  },

  // Pricing section - floating geometric shapes
  pricing: {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#8b5cf6", "#06b6d4"]
      },
      shape: {
        type: ["polygon", "triangle"],
        stroke: {
          width: 1,
          color: "#ffffff20"
        },
        polygon: {
          nb_sides: 6
        }
      },
      opacity: {
        value: 0.2,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 2,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      },
      rotate: {
        value: 0,
        random: true,
        direction: "clockwise",
        animation: {
          enable: true,
          speed: 1,
          sync: false
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 0.4
          }
        }
      }
    },
    retina_detect: true
  }
};

// Particle system manager
class ParticleManager {
  constructor() {
    this.instances = new Map();
    this.isEnabled = true;
    this.loadParticles();
  }

  async loadParticles() {
    try {
      // Load tsParticles from CDN
      if (!window.tsParticles) {
        await this.loadScript('https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js');
      }
      this.initParticles();
    } catch (error) {
      console.warn('Failed to load particles:', error);
    }
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  initParticles() {
    if (!window.tsParticles || !this.isEnabled) return;

    // Initialize particles for key sections only
    this.createParticleCanvas('hero', particlesConfig.hero);
    this.createParticleCanvas('services', particlesConfig.services);
    this.createParticleCanvas('pricing', particlesConfig.pricing);

    // Performance monitoring
    this.monitorPerformance();
  }

  createParticleCanvas(sectionId, config) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Create canvas container
    const canvasId = `particles-${sectionId}`;
    let canvas = document.getElementById(canvasId);
    
    if (!canvas) {
      canvas = document.createElement('div');
      canvas.id = canvasId;
      canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      `;
      
      // Ensure section has relative positioning
      section.style.position = 'relative';
      section.insertBefore(canvas, section.firstChild);
    }

    // Initialize particles
    tsParticles.load(canvasId, config).then((container) => {
      this.instances.set(sectionId, container);
    });
  }

  monitorPerformance() {
    // Disable particles on low-performance devices
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) {
      this.disable();
    }

    // Disable on mobile if performance is poor
    if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
      this.disable();
    }
  }

  disable() {
    this.isEnabled = false;
    this.instances.forEach((container, sectionId) => {
      container.destroy();
      const canvas = document.getElementById(`particles-${sectionId}`);
      if (canvas) canvas.remove();
    });
    this.instances.clear();
  }

  enable() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      this.initParticles();
    }
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }
}

// Initialize particle manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.particleManager = new ParticleManager();
});

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { particlesConfig, ParticleManager };
}