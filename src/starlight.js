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
  },

  /**
   * Initializes dropdown menus.
   * Toggles '.active' class on '.dropdown' elements when clicked.
   */
  initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle') || dropdown.querySelector('button') || dropdown.querySelector('a');
      
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          // If it's a link that points somewhere, let it work normally
          if (toggle.tagName === 'A' && toggle.getAttribute('href') && toggle.getAttribute('href') !== '#') {
            return;
          }
          
          e.preventDefault();
          e.stopPropagation();
          
          const isActive = dropdown.classList.contains('active');
          
          // Close all other dropdowns
          document.querySelectorAll('.dropdown.active').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
          });
          
          dropdown.classList.toggle('active', !isActive);
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.active').forEach(d => {
          d.classList.remove('active');
        });
      }
    });
  },

  /**
   * Initializes accordion components.
   * Toggles '.active' class on '.accordion-item' when header is clicked.
   */
  initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const group = item.closest('.accordion-group');
        const isActive = item.classList.contains('active');
        
        // If in a group, close others
        if (group) {
          group.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        }
        
        item.classList.toggle('active', !isActive);
      });
    });
  },

  /**
   * Initializes tab components.
   * Switches '.active' class on buttons and panels.
   */
  initTabs() {
    const tabLists = document.querySelectorAll('.tab-list');
    
    tabLists.forEach(list => {
      const buttons = list.querySelectorAll('.tab-button');
      const container = list.parentElement;
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const targetId = button.getAttribute('data-tab');
          if (!targetId) return;
          
          // Update buttons
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Update panels
          const panels = container.querySelectorAll('.tab-panel');
          panels.forEach(panel => {
            panel.classList.toggle('active', panel.id === targetId);
          });
        });
      });
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
    Starlight.initDropdowns();
    Starlight.initAccordions();
    Starlight.initTabs();
  });
}
