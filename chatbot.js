// Enhanced Chatbot Functionality

let chatboxOpen = false;
let messageCount = 0;

// Initialize chatbot when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initChatbot();
  showWelcomeNotification();
});

function initChatbot() {
  const chatInput = document.getElementById('chat-input');
  const chatbotIcon = document.querySelector('.chatbot-icon');
  
  // Handle Enter key press
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Show typing indicator when user is typing
    chatInput.addEventListener('input', function() {
      if (this.value.length > 0) {
        showTypingIndicator();
      } else {
        hideTypingIndicator();
      }
    });
  }
  
  // Add enhanced interaction on click
  if (chatbotIcon) {
    chatbotIcon.addEventListener('click', function() {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: clickRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `;
      this.appendChild(ripple);
      
      // Add avatar excitement animation
      const avatar = this.querySelector('.chatbot-avatar');
      if (avatar) {
        avatar.style.animation = 'avatarExcitement 0.8s ease-out';
        setTimeout(() => {
          avatar.style.animation = 'avatarFloat 3s ease-in-out infinite';
        }, 800);
      }
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
  
  // Auto-hide notification after showing for 30 seconds
  setTimeout(() => {
    hideNotification();
  }, 30000);
}

function toggleChatbox() {
  const chatbox = document.getElementById('chatbox');
  const icon = document.querySelector('.chatbot-icon');
  
  chatboxOpen = !chatboxOpen;
  
  if (chatboxOpen) {
    chatbox.classList.add('open');
    icon.style.transform = 'scale(0.9)';
    hideNotification();
    
    // Focus on input when opened
    setTimeout(() => {
      const input = document.getElementById('chat-input');
      if (input) input.focus();
    }, 300);
  } else {
    chatbox.classList.remove('open');
    icon.style.transform = '';
    hideTypingIndicator();
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  
  if (!input) {
    console.error('Chat input element not found');
    return;
  }
  
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addMessage(message, 'user');
  input.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Send message to AI API
  sendToAI(message);
}

async function sendToAI(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        history: chatHistory || []
      })
    });
    
    const data = await response.json();
    
    hideTypingIndicator();
    
    if (data.status === 'success') {
      addMessage(data.response, 'ai');
      
      // Update chat history
      if (!window.chatHistory) {
        window.chatHistory = [];
      }
      window.chatHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: data.response }
      );
      
      // Keep only last 10 messages for context
      if (window.chatHistory.length > 20) {
        window.chatHistory = window.chatHistory.slice(-20);
      }
    } else {
      addMessage(data.error || 'Sorry, I am having trouble right now. Please try again.', 'ai');
    }
    
  } catch (error) {
    console.error('Chat API error:', error);
    hideTypingIndicator();
    addMessage('Sorry, I am having trouble connecting right now. Please try again in a moment.', 'ai');
  }
}

function addMessage(content, sender) {
  const messagesContainer = document.getElementById('chatbox-messages');
  
  if (!messagesContainer) {
    console.error('Messages container not found');
    return;
  }
  
  if (!content || typeof content !== 'string') {
    console.error('Invalid message content');
    return;
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.innerHTML = content;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  messageCount++;
}

function handleAIResponse(userMessage) {
  const message = userMessage.toLowerCase();
  let response = '';
  
  // Intelligent response mapping
  if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
    response = `💰 Great question! Our AI Assistant packages start at <strong>$497</strong> for the Starter plan. This includes:
    <br><br>
    • Complete AI chatbot setup
    • 5 conversation flows
    • Basic integrations
    • Email support
    <br><br>
    Would you like me to show you our full pricing comparison?`;
  } else if (message.includes('cloud') || message.includes('aws') || message.includes('devops')) {
    response = `☁️ I can definitely help with cloud solutions! We specialize in:
    <br><br>
    • AWS/GCP infrastructure setup
    • Docker & Kubernetes deployment
    • CI/CD pipeline automation
    • Monitoring & scaling solutions
    <br><br>
    What's your current tech stack and what challenges are you facing?`;
  } else if (message.includes('ai') || message.includes('chatbot') || message.includes('automation')) {
    response = `🤖 Perfect! AI integration is our specialty. We can help you with:
    <br><br>
    • Custom GPT-powered chatbots
    • LangChain implementations
    • API integrations (OpenAI, Claude, etc.)
    • Workflow automation
    <br><br>
    What kind of AI solution are you looking to build?`;
  } else if (message.includes('start') || message.includes('begin') || message.includes('getting started')) {
    response = `🚀 Let's get you started! Here's how we typically work:
    <br><br>
    1️⃣ <strong>Discovery Call</strong> - 15 min to understand your needs
    2️⃣ <strong>Custom Proposal</strong> - Tailored solution & timeline
    3️⃣ <strong>Implementation</strong> - We build while you focus on business
    4️⃣ <strong>Launch & Support</strong> - Go live with ongoing assistance
    <br><br>
    Ready to schedule a quick discovery call?`;
  } else if (message.includes('time') || message.includes('timeline') || message.includes('how long')) {
    response = `⏱️ Timeline depends on complexity, but here are typical ranges:
    <br><br>
    • <strong>Basic AI Chatbot:</strong> 2-3 days
    • <strong>Cloud Infrastructure:</strong> 3-5 days  
    • <strong>Full DevOps Setup:</strong> 1-2 weeks
    • <strong>Custom AI Solution:</strong> 2-4 weeks
    <br><br>
    We provide daily progress updates and work in sprints for transparency.`;
  } else if (message.includes('support') || message.includes('help') || message.includes('maintenance')) {
    response = `🛠️ We provide comprehensive support:
    <br><br>
    • <strong>Starter:</strong> Email support + documentation
    • <strong>Business:</strong> Priority email + video calls
    • <strong>Elite:</strong> 24/7 phone + Slack channel
    <br><br>
    Plus all plans include 30 days of post-launch support included.`;
  } else if (message.includes('contact') || message.includes('call') || message.includes('meeting')) {
    response = `📞 Ready to chat? Here are the best ways to reach me:
    <br><br>
    • <strong>Quick Call:</strong> <a href="#contact" onclick="toggleChatbox(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});">Schedule via contact form</a>
    • <strong>Email:</strong> Direct response within 2 hours
    • <strong>This Chat:</strong> I'm here for immediate questions
    <br><br>
    What works best for your schedule?`;
  } else {
    response = `Thanks for your message! I'd love to help you with that. 
    <br><br>
    For the most accurate information about your specific needs, I'd recommend:
    <br><br>
    1️⃣ <strong>Fill out our contact form</strong> with details
    2️⃣ <strong>Schedule a 15-min discovery call</strong> 
    3️⃣ <strong>Get a custom proposal</strong> within 24 hours
    <br><br>
    Would you like me to help you get started with any of these?`;
  }
  
  addMessage(response, 'bot');
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatbox-messages');
  
  // Remove existing typing indicator
  const existingTyping = document.querySelector('.typing-indicator');
  if (existingTyping) {
    existingTyping.remove();
  }
  
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = `
    <span>TechGuru is typing</span>
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function showWelcomeNotification() {
  setTimeout(() => {
    const notification = document.querySelector('.chatbot-notification');
    if (notification && !chatboxOpen) {
      notification.style.display = 'flex';
      notification.textContent = '1';
      
      // Add bounce animation
      notification.style.animation = 'notificationBounce 0.5s ease';
    }
  }, 3000); // Show after 3 seconds
}

function hideNotification() {
  const notification = document.querySelector('.chatbot-notification');
  if (notification) {
    notification.style.display = 'none';
  }
}

// Add some personality with random status updates
const statusMessages = [
  'Online - typically replies instantly',
  'Online - ready to help build your next project',
  'Online - specializing in AI & cloud solutions',
  'Online - helping startups scale their tech'
];

function updateStatus() {
  const statusElement = document.querySelector('.chatbox-header-status');
  if (statusElement && !chatboxOpen) {
    const randomStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)];
    statusElement.innerHTML = `<span class="status-indicator"></span>${randomStatus}`;
  }
}

// Update status every 30 seconds
setInterval(updateStatus, 30000);

// Add scroll-to-bottom functionality for better UX
function scrollToBottom() {
  const messagesContainer = document.getElementById('chatbox-messages');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Enhanced mobile experience
function handleMobileInteraction() {
  const isMobile = window.innerWidth <= 768;
  const chatbox = document.getElementById('chatbox');
  
  if (isMobile && chatboxOpen) {
    chatbox.style.width = '95vw';
    chatbox.style.height = '80vh';
    chatbox.style.left = '2.5vw';
    chatbox.style.bottom = '1rem';
  }
}

window.addEventListener('resize', handleMobileInteraction);