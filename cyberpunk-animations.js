// ===================================
// CYBERPUNK FUTURISTIC ANIMATIONS
// ===================================

class CyberpunkEffects {
  constructor() {
    this.particles = [];
    this.matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    this.init();
  }

  init() {
    this.createDataStream();
    this.createFloatingParticles();
    this.createMatrixRain();
    this.initGlitchEffects();
    this.initHolographicCards();
    this.initScanLines();
    this.initTerminalEffects();
  }

  createDataStream() {
    const streamContainer = document.createElement('div');
    streamContainer.className = 'data-stream';
    document.body.appendChild(streamContainer);
  }

  createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-field';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      
      // Random colors for particles
      const colors = ['#00ffff', '#ff0040', '#00ff40', '#ffff00'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      particleContainer.appendChild(particle);
    }
  }

  createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);

    for (let i = 0; i < 20; i++) {
      const column = document.createElement('div');
      column.style.position = 'absolute';
      column.style.left = (i * 5) + '%';
      column.style.top = '-100px';
      column.style.color = '#00ff00';
      column.style.fontSize = '14px';
      column.style.fontFamily = 'monospace';
      column.style.animation = `matrixFall ${Math.random() * 10 + 10}s linear infinite`;
      column.style.animationDelay = Math.random() * 5 + 's';
      
      let text = '';
      for (let j = 0; j < 20; j++) {
        text += this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)] + '<br>';
      }
      column.innerHTML = text;
      
      matrixContainer.appendChild(column);
    }

    // Add CSS for matrix fall animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes matrixFall {
        to { transform: translateY(calc(100vh + 100px)); }
      }
    `;
    document.head.appendChild(style);
  }

  initGlitchEffects() {
    // Add glitch effect to main headers
    const headers = document.querySelectorAll('h1, .hero-title');
    headers.forEach(header => {
      header.classList.add('glitch-text');
      header.setAttribute('data-text', header.textContent);
    });

    // Random glitch trigger
    setInterval(() => {
      const glitchElements = document.querySelectorAll('.glitch-text');
      if (glitchElements.length > 0 && Math.random() < 0.1) {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.style.animation = 'none';
        setTimeout(() => {
          randomElement.style.animation = 'glitch 2s linear infinite';
        }, 100);
      }
    }, 2000);
  }

  initHolographicCards() {
    // Convert existing cards to holographic style
    const cards = document.querySelectorAll('.service-card, .plan-card, .stat-card');
    cards.forEach(card => {
      card.classList.add('holo-card');
      
      // Add interactive hover effects
      card.addEventListener('mouseenter', () => {
        this.playHologramSound();
      });
    });
  }

  initScanLines() {
    // Add scanning effects to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (index % 2 === 0) {
        section.classList.add('scan-line');
      }
    });
  }

  initTerminalEffects() {
    // Convert descriptions to terminal style
    const descriptions = document.querySelectorAll('.service-description');
    descriptions.forEach(desc => {
      if (Math.random() < 0.3) {
        desc.classList.add('terminal-text');
      }
    });
  }

  playHologramSound() {
    // Create audio context for futuristic sounds
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      const audioContext = new (AudioContext || webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }

  // Advanced cursor effects
  initCyberCursor() {
    let cursor = document.querySelector('.cyber-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'cyber-cursor';
      cursor.innerHTML = `
        <div class="cursor-dot"></div>
        <div class="cursor-ring"></div>
      `;
      document.body.appendChild(cursor);
    }

    document.addEventListener('mousemove', (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    });

    // Cursor interactions with null checks
    const interactiveElements = document.querySelectorAll('a, button, .holo-card');
    interactiveElements.forEach(el => {
      if (el && cursor) {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cyber-cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cyber-cursor-hover');
        });
      }
    });
  }

  // HUD-style loading screens
  createHUDLoader() {
    const loader = document.createElement('div');
    loader.className = 'hud-loader';
    loader.innerHTML = `
      <div class="hud-element">
        <div class="cyber-loader"></div>
        <div class="terminal-text">INITIALIZING TECHGURU SYSTEMS...</div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(loader);
    
    // Simulate loading
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 3000);
  }

  // Neural network background
  createNeuralNetwork() {
    const canvas = document.createElement('canvas');
    canvas.id = 'neural-network';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const nodeCount = 100;

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffff';
        ctx.fill();
      });
      
      // Draw connections
      nodes.forEach(node => {
        nodes.forEach(otherNode => {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + 
            Math.pow(node.y - otherNode.y, 2)
          );
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
}

// Initialize cyberpunk effects when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const cyberpunk = new CyberpunkEffects();
  cyberpunk.initCyberCursor();
  cyberpunk.createNeuralNetwork();
  
  // Add startup loading effect
  cyberpunk.createHUDLoader();
});

// Add custom cursor styles
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
  .cyber-cursor {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  }
  
  .cursor-dot {
    width: 4px;
    height: 4px;
    background: #00ffff;
    border-radius: 50%;
    position: relative;
    transform: translate(-50%, -50%);
  }
  
  .cursor-ring {
    width: 20px;
    height: 20px;
    border: 1px solid #00ffff;
    border-radius: 50%;
    position: absolute;
    top: -8px;
    left: -8px;
    transition: all 0.1s ease;
  }
  
  .cyber-cursor-hover .cursor-ring {
    width: 40px;
    height: 40px;
    top: -18px;
    left: -18px;
    border-color: #ff0040;
  }
  
  .hud-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
  }
  
  .progress-bar {
    width: 200px;
    height: 4px;
    background: rgba(0, 255, 255, 0.2);
    margin-top: 10px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00ffff, #00ff40);
    width: 0;
    animation: progressLoad 3s ease-out forwards;
  }
  
  @keyframes progressLoad {
    to { width: 100%; }
  }
`;
document.head.appendChild(cursorStyles);