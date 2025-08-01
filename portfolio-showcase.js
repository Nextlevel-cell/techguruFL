// PORTFOLIO SHOWCASE ENHANCEMENT

// Create an interactive portfolio section
function createPortfolioShowcase() {
  const portfolioSection = document.createElement('section');
  portfolioSection.id = 'portfolio';
  portfolioSection.innerHTML = `
    <div class="container">
      <h2>Featured Projects</h2>
      <div class="portfolio-filter">
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="cloud">Cloud Solutions</button>
        <button class="filter-btn" data-filter="ai">AI Integration</button>
        <button class="filter-btn" data-filter="devops">DevOps</button>
      </div>
      <div class="portfolio-grid">
        <div class="portfolio-item" data-category="cloud">
          <div class="portfolio-card">
            <div class="portfolio-image">
              <div class="project-placeholder">
                <i class="fas fa-cloud"></i>
                <h4>Multi-Cloud Infrastructure</h4>
              </div>
            </div>
            <div class="portfolio-content">
              <h3>Scalable Cloud Architecture</h3>
              <p>Designed and implemented a multi-cloud infrastructure supporting 10M+ users with 99.9% uptime.</p>
              <div class="tech-stack">
                <span class="tech">AWS</span>
                <span class="tech">Kubernetes</span>
                <span class="tech">Terraform</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="portfolio-item" data-category="ai">
          <div class="portfolio-card">
            <div class="portfolio-image">
              <div class="project-placeholder">
                <i class="fas fa-robot"></i>
                <h4>AI Customer Support</h4>
              </div>
            </div>
            <div class="portfolio-content">
              <h3>Intelligent Chatbot System</h3>
              <p>Custom GPT-powered chatbot reducing customer service costs by 60% while improving satisfaction.</p>
              <div class="tech-stack">
                <span class="tech">OpenAI</span>
                <span class="tech">Python</span>
                <span class="tech">FastAPI</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="portfolio-item" data-category="devops">
          <div class="portfolio-card">
            <div class="portfolio-image">
              <div class="project-placeholder">
                <i class="fas fa-code-branch"></i>
                <h4>CI/CD Pipeline</h4>
              </div>
            </div>
            <div class="portfolio-content">
              <h3>Automated Deployment Pipeline</h3>
              <p>Zero-downtime deployment system reducing release time from hours to minutes.</p>
              <div class="tech-stack">
                <span class="tech">GitHub Actions</span>
                <span class="tech">Docker</span>
                <span class="tech">Jenkins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Insert after services section
  const servicesSection = document.getElementById('services');
  servicesSection.parentNode.insertBefore(portfolioSection, servicesSection.nextSibling);
  
  initPortfolioFilters();
}

function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  createPortfolioShowcase();
});