// ADVANCED CHATBOT AVATAR ENHANCEMENTS

class ChatbotAvatarEnhancer {
  constructor() {
    this.avatar = null;
    this.isIdle = true;
    this.expressions = ['happy', 'thinking', 'excited', 'calm'];
    this.currentExpression = 'calm';
    this.init();
  }

  init() {
    this.avatar = document.querySelector('.chatbot-avatar');
    if (this.avatar) {
      this.setupAvatarEnhancements();
      this.startIdleAnimations();
      this.setupInteractionResponses();
    }
  }

  setupAvatarEnhancements() {
    // Add breathing effect
    this.avatar.style.animation = 'avatarFloat 3s ease-in-out infinite, avatarBreathe 4s ease-in-out infinite';
    
    // Add responsive hover states
    this.avatar.addEventListener('mouseenter', () => {
      this.setExpression('excited');
    });
    
    this.avatar.addEventListener('mouseleave', () => {
      this.setExpression('calm');
    });
  }

  setExpression(expression) {
    this.currentExpression = expression;
    const avatar = this.avatar;
    
    switch(expression) {
      case 'happy':
        avatar.style.filter = `
          drop-shadow(0 0 16px rgba(255, 215, 0, 0.8))
          drop-shadow(0 0 25px rgba(255, 165, 0, 0.6))
          brightness(1.2)
        `;
        break;
      case 'thinking':
        avatar.style.filter = `
          drop-shadow(0 0 16px rgba(138, 43, 226, 0.8))
          drop-shadow(0 0 25px rgba(75, 0, 130, 0.6))
          hue-rotate(45deg)
        `;
        break;
      case 'excited':
        avatar.style.filter = `
          drop-shadow(0 0 16px rgba(255, 20, 147, 0.8))
          drop-shadow(0 0 25px rgba(255, 69, 0, 0.6))
          saturate(1.5)
        `;
        avatar.style.animation = 'avatarFloat 1.5s ease-in-out infinite, avatarExcitement 2s ease-in-out infinite';
        break;
      case 'calm':
      default:
        avatar.style.filter = `
          drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))
          drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))
        `;
        avatar.style.animation = 'avatarFloat 3s ease-in-out infinite, avatarBreathe 4s ease-in-out infinite';
        break;
    }
  }

  startIdleAnimations() {
    // Random subtle movements when idle
    setInterval(() => {
      if (this.isIdle) {
        const randomMovement = Math.random();
        if (randomMovement < 0.1) { // 10% chance
          this.performIdleGesture();
        }
      }
    }, 3000);
  }

  performIdleGesture() {
    const gestures = ['blink', 'tilt', 'glow'];
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    
    switch(randomGesture) {
      case 'blink':
        this.avatar.style.animation = 'avatarBlink 0.3s ease-in-out, avatarFloat 3s ease-in-out infinite 0.3s';
        break;
      case 'tilt':
        this.avatar.style.transform = 'rotate(5deg)';
        setTimeout(() => {
          this.avatar.style.transform = '';
        }, 500);
        break;
      case 'glow':
        this.avatar.style.filter = `
          drop-shadow(0 0 20px rgba(99, 102, 241, 1))
          drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))
        `;
        setTimeout(() => {
          this.setExpression(this.currentExpression);
        }, 800);
        break;
    }
  }

  setupInteractionResponses() {
    // Respond to chat interactions
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.querySelector('.chatbox-form button');
    
    if (chatInput) {
      chatInput.addEventListener('focus', () => {
        this.isIdle = false;
        this.setExpression('excited');
      });
      
      chatInput.addEventListener('blur', () => {
        this.isIdle = true;
        this.setExpression('calm');
      });
      
      chatInput.addEventListener('input', () => {
        this.setExpression('thinking');
      });
    }
    
    if (sendButton) {
      sendButton.addEventListener('click', () => {
        this.setExpression('happy');
        setTimeout(() => {
          this.setExpression('thinking');
        }, 1000);
        setTimeout(() => {
          this.setExpression('calm');
        }, 3000);
      });
    }
  }

  // Method to trigger specific animations
  celebrate() {
    this.avatar.style.animation = 'avatarCelebrate 1s ease-in-out';
    this.setExpression('happy');
    setTimeout(() => {
      this.avatar.style.animation = 'avatarFloat 3s ease-in-out infinite';
      this.setExpression('calm');
    }, 1000);
  }

  wave() {
    this.avatar.style.animation = 'avatarWave 1.5s ease-in-out';
    this.setExpression('excited');
    setTimeout(() => {
      this.avatar.style.animation = 'avatarFloat 3s ease-in-out infinite';
      this.setExpression('calm');
    }, 1500);
  }
}

// Initialize avatar enhancer
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.chatbotAvatarEnhancer = new ChatbotAvatarEnhancer();
  }, 500);
});