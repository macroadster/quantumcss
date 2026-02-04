/**
 * Starlight UI - Interactive Helpers
 * Standardized components for the QuantumCSS framework
 */

const Starlight = {
  /**
   * Initializes a randomized star field in the target container.
   * @param {string} selector - CSS selector for the container (default: '.starlight-stars')
   * @param {number} count - Number of stars to generate (default: 150)
   */
  initStars(selector = '.starlight-stars', count = 150) {
    const containers = document.querySelectorAll(selector);
    
    containers.forEach(container => {
      // Clear existing stars if any
      container.innerHTML = '';
      
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Randomize position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Randomize size (1px to 3px)
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Randomize animation duration (2s to 5s)
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        
        container.appendChild(star);
      }
    });
  },

  /**
   * Initializes navigation menu toggles for mobile view.
   * Expects a toggle element with class '.hamburger' and a menu with class '.nav-menu-mobile'.
   */
  initNavigation() {
    const toggles = document.querySelectorAll('.hamburger');
    
    toggles.forEach(toggle => {
      // Find the closest navigation container or parent
      const nav = toggle.closest('nav') || toggle.closest('.starlight-nav') || toggle.parentElement;
      if (!nav) return;

      // Find the menu - it might be inside the nav or a sibling
      let menu = nav.querySelector('.nav-menu-mobile');
      if (!menu && nav.nextElementSibling && nav.nextElementSibling.classList.contains('nav-menu-mobile')) {
        menu = nav.nextElementSibling;
      }
      
      if (menu) {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isActive = toggle.classList.toggle('active');
          menu.classList.toggle('active', isActive);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
          }
        });
      }
    });
  }
};

// Auto-initialize if the element exists and we're in a browser
if (typeof window !== 'undefined') {
  window.Starlight = Starlight;
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.starlight-stars')) {
      Starlight.initStars();
    }
    Starlight.initNavigation();
  });
}
