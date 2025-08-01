
document.addEventListener('DOMContentLoaded', function() {
    console.log('Scripts initialized');
    
    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
        applyTheme(savedTheme);
    }
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        console.log('Applying theme:', theme);
        console.log('Theme applied. Current data-theme:', document.documentElement.getAttribute('data-theme'));
    }
    
    if (themeToggle) {
        console.log('Theme toggle found and working');
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
    
    // Initialize theme
    initTheme();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('open', !isOpen);
            });
        }
    });
    
    // Floating Chat Button
    const chatButton = document.createElement('button');
    chatButton.id = 'floating-chat';
    chatButton.innerHTML = `
        <img src="/static/chat-avatar.png" alt="TechGuru AI Assistant" />
    `;
    chatButton.setAttribute('aria-label', 'Open TechGuru AI Chat');
    
    // Add chat button styles
    const chatStyles = document.createElement('style');
    chatStyles.textContent = `
        #floating-chat {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 120px;
            height: 120px;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            animation: float 3s ease-in-out infinite;
            padding: 0;
            overflow: visible;
        }
        
        #floating-chat img {
            width: 120px;
            height: 120px;
            object-fit: contain;
            filter: drop-shadow(0 4px 20px rgba(59, 130, 246, 0.3));
            transition: transform 0.2s cubic-bezier(.5,1.5,.7,1.1), filter 0.3s ease;
        }
        
        #floating-chat:hover img {
            transform: scale(1.10);
            filter: drop-shadow(0 6px 30px rgba(59, 130, 246, 0.4));
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        
        .chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 1001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .chat-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .chat-content {
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 600px;
            backdrop-filter: blur(20px);
        }
    `;
    document.head.appendChild(chatStyles);
    
    // Chat modal functionality
    chatButton.addEventListener('click', function() {
        let modal = document.getElementById('chat-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'chat-modal';
            modal.className = 'chat-modal';
            modal.innerHTML = `
                <div class="chat-content">
                    <h3 style="color: #3b82f6; margin-bottom: 1rem;">TechGuru AI Assistant</h3>
                    <p style="margin-bottom: 1.5rem; color: #cbd5e1; line-height: 1.6;">
                        Hello! I'm here to help you with questions about our services, 
                        pricing, or technical solutions. What can I assist you with today?
                    </p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button onclick="window.location.href='#services'" style="background: #3b82f6; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; color: white; cursor: pointer;">View Services</button>
                        <button onclick="window.location.href='#contact'" style="background: transparent; border: 1px solid #3b82f6; padding: 0.75rem 1.5rem; border-radius: 8px; color: #3b82f6; cursor: pointer;">Contact Us</button>
                        <button onclick="document.getElementById('chat-modal').classList.remove('active')" style="background: #6b7280; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; color: white; cursor: pointer;">Close</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close on backdrop click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
        
        modal.classList.add('active');
    });
    
    document.body.appendChild(chatButton);
    
    // Performance monitoring
    const performanceMetrics = {
        loadTime: performance.now(),
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
    };
    
    console.log('Performance Metrics:', performanceMetrics);
});
