/**
 * Starlight UI - Interactive Helpers
 * Standardized components for the QuantumCSS framework
 */

const Starlight = {
  /**
   * Initializes a randomized star field in the target container.
   * @param {string} selector - CSS selector for the container (default: '.starlight-stars')
   * @param {number} count - Number of stars to generate (default: 100)
   */
  initStars(selector = '.starlight-stars', count = 100) {
    const containers = document.querySelectorAll(selector);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    containers.forEach(container => {
      // Clear existing stars if any
      container.innerHTML = '';
      
      // If user prefers reduced motion, maybe skip or show static stars
      if (prefersReducedMotion) {
        count = Math.floor(count / 2); // Show fewer stars if motion is reduced
      }
      
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
        if (!prefersReducedMotion) {
          star.style.setProperty('--q-duration', `${Math.random() * 3 + 2}s`);
        } else {
          star.style.animation = 'none';
          star.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        }
        
        container.appendChild(star);
      }
    });
  },

  /**
   * Initializes navigation menu toggles for mobile view.
   * Uses data attributes for flexible targeting and reduced DOM dependencies.
   */
  initNavigation() {
    const toggles = document.querySelectorAll('[data-nav-toggle]');
    
    toggles.forEach(toggle => {
      const config = {
        targetSelector: toggle.getAttribute('data-nav-target'),
        targetId: toggle.getAttribute('data-nav-target-id'),
        activeClass: toggle.getAttribute('data-nav-active-class') || 'active',
        closeOnOutside: toggle.getAttribute('data-nav-close-outside') !== 'false'
      };
      
      // Find target menu with multiple fallback methods
      let menu = null;
      
      if (config.targetId) {
        menu = document.getElementById(config.targetId);
      } else if (config.targetSelector) {
        menu = document.querySelector(config.targetSelector);
      } else {
        // Fallback: look for common patterns
        const nav = toggle.closest('nav') || toggle.closest('[data-nav]') || toggle.parentElement;
        if (nav) {
          menu = nav.querySelector('.nav-menu-mobile, [data-nav-menu]');
          if (!menu && nav.nextElementSibling) {
            menu = nav.nextElementSibling.querySelector('.nav-menu-mobile, [data-nav-menu]') || 
                   nav.nextElementSibling;
          }
        }
      }
      
      if (menu) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const isActive = toggle.classList.toggle(config.activeClass);
          menu.classList.toggle(config.activeClass, isActive);
          
          // Update aria attributes for accessibility
          toggle.setAttribute('aria-expanded', isActive);
          menu.setAttribute('aria-hidden', !isActive);
          
          // Emit custom event
          toggle.dispatchEvent(new CustomEvent('navToggle', {
            detail: { menu, isActive }
          }));
        });

        // Close menu when clicking outside (optional)
        if (config.closeOnOutside) {
          const handleOutsideClick = (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
              menu.classList.remove(config.activeClass);
              toggle.classList.remove(config.activeClass);
              toggle.setAttribute('aria-expanded', 'false');
              menu.setAttribute('aria-hidden', 'true');
            }
          };
          
          document.addEventListener('click', handleOutsideClick);
          
          // Clean up on component destruction
          toggle.addEventListener('navDestroy', () => {
            document.removeEventListener('click', handleOutsideClick);
          });
        }
      }
    });
    
    // Fallback for legacy hamburger (backward compatibility)
    const legacyToggles = document.querySelectorAll('.hamburger:not([data-nav-toggle])');
    legacyToggles.forEach(toggle => {
      const nav = toggle.closest('nav') || toggle.closest('.starlight-nav') || toggle.parentElement;
      if (!nav) return;

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
   * Uses data attributes for flexible configuration and reduced DOM dependencies.
   */
  initAccordions() {
    const accordions = document.querySelectorAll('[data-accordion]');
    
    accordions.forEach(accordion => {
      const config = {
        allowMultiple: accordion.getAttribute('data-accordion-allow-multiple') === 'true',
        closeOthers: accordion.getAttribute('data-accordion-close-others') !== 'false',
        headerSelector: accordion.getAttribute('data-accordion-header') || '.accordion-header',
        contentSelector: accordion.getAttribute('data-accordion-content') || '.accordion-content',
        itemSelector: accordion.getAttribute('data-accordion-item') || '.accordion-item'
      };
      
      // Find headers within this accordion
      const headers = accordion.querySelectorAll(config.headerSelector);
      
      headers.forEach(header => {
        header.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Find the associated item (could be parent, sibling, or specified via data attribute)
          let item = header.closest(config.itemSelector);
          if (!item) {
            const itemId = header.getAttribute('data-accordion-item-id');
            if (itemId) {
              item = document.getElementById(itemId);
            }
          }
          
          if (!item) return;
          
          const isActive = item.classList.contains('active');
          const groupId = accordion.getAttribute('data-accordion-group');
          
          // Handle accordion grouping logic
          if (config.closeOthers && !config.allowMultiple && !isActive) {
            if (groupId) {
              // Close items in same group across different accordions
              document.querySelectorAll(`[data-accordion-group="${groupId}"] ${config.itemSelector}.active`)
                .forEach(i => i.classList.remove('active'));
            } else {
              // Close items in this accordion only
              accordion.querySelectorAll(`${config.itemSelector}.active`)
                .forEach(i => i.classList.remove('active'));
            }
          }
          
          // Toggle current item
          item.classList.toggle('active', !isActive);
          
          // Emit custom event for external handling
          accordion.dispatchEvent(new CustomEvent('accordionToggle', {
            detail: { item, isActive: !isActive }
          }));
        });
      });
    });
    
    // Fallback for legacy accordion-header (backward compatibility)
    // Only target headers that are NOT already managed by a data-accordion container
    const legacyHeaders = document.querySelectorAll('.accordion-header:not([data-accordion])');
    legacyHeaders.forEach(header => {
      if (header.closest('[data-accordion]')) return;
      
      const item = header.parentElement;
      const group = item.closest('.accordion-group');
      
      header.addEventListener('click', () => {
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
   * Uses data attributes for flexible configuration and reduced DOM dependencies.
   */
  initTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');
    
    tabContainers.forEach(container => {
      const config = {
        buttonSelector: container.getAttribute('data-tabs-buttons') || '.tab-button',
        panelSelector: container.getAttribute('data-tabs-panels') || '.tab-panel',
        activeClass: container.getAttribute('data-tabs-active-class') || 'active',
        orientation: container.getAttribute('data-tabs-orientation') || 'horizontal',
        initialTab: container.getAttribute('data-tabs-initial')
      };
      
      // Find buttons and panels with flexible targeting
      let buttons, panels;
      
      if (container.hasAttribute('data-tabs-buttons')) {
        buttons = document.querySelectorAll(config.buttonSelector);
      } else {
        buttons = container.querySelectorAll(config.buttonSelector);
      }
      
      if (container.hasAttribute('data-tabs-panels')) {
        panels = document.querySelectorAll(config.panelSelector);
      } else {
        panels = container.querySelectorAll(config.panelSelector);
      }
      
      // Initialize active tab
      let activeTabId = config.initialTab;
      if (!activeTabId) {
        const firstButton = buttons[0];
        if (firstButton) {
          activeTabId = firstButton.getAttribute('data-tab') || firstButton.getAttribute('data-tabs-target');
        }
      }
      
      // Set initial state
      if (activeTabId) {
        buttons.forEach(btn => {
          const btnTargetId = btn.getAttribute('data-tab') || btn.getAttribute('data-tabs-target');
          btn.classList.toggle(config.activeClass, btnTargetId === activeTabId);
          btn.setAttribute('aria-selected', btnTargetId === activeTabId);
          btn.setAttribute('tabindex', btnTargetId === activeTabId ? '0' : '-1');
        });
        
        panels.forEach(panel => {
          panel.classList.toggle(config.activeClass, panel.id === activeTabId);
          panel.setAttribute('aria-hidden', panel.id !== activeTabId);
        });
      }
      
      // Add click handlers
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = button.getAttribute('data-tab') || button.getAttribute('data-tabs-target');
          if (!targetId) return;
          
          // Update buttons
          buttons.forEach(btn => {
            const btnTargetId = btn.getAttribute('data-tab') || btn.getAttribute('data-tabs-target');
            const isActive = btnTargetId === targetId;
            btn.classList.toggle(config.activeClass, isActive);
            btn.setAttribute('aria-selected', isActive);
            btn.setAttribute('tabindex', isActive ? '0' : '-1');
          });
          
          // Update panels
          panels.forEach(panel => {
            const isActive = panel.id === targetId;
            panel.classList.toggle(config.activeClass, isActive);
            panel.setAttribute('aria-hidden', !isActive);
          });
          
          // Emit custom event
          container.dispatchEvent(new CustomEvent('tabChange', {
            detail: { targetId, activeButton: button, activePanel: document.getElementById(targetId) }
          }));
        });
        
        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
          const currentIndex = Array.from(buttons).indexOf(button);
          let nextIndex;
          
          switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
              e.preventDefault();
              nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
              break;
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault();
              nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
              break;
            case 'Home':
              e.preventDefault();
              nextIndex = 0;
              break;
            case 'End':
              e.preventDefault();
              nextIndex = buttons.length - 1;
              break;
            default:
              return;
          }
          
          if (nextIndex !== undefined) {
            buttons[nextIndex].focus();
            buttons[nextIndex].click();
          }
        });
      });
    });
    
    // Fallback for legacy tab-list (backward compatibility)
    const legacyTabLists = document.querySelectorAll('.tab-list:not([data-tabs])');
    legacyTabLists.forEach(list => {
      const buttons = list.querySelectorAll('.tab-button');
      const container = list.parentElement;
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const targetId = button.getAttribute('data-tab');
          if (!targetId) return;
          
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          const panels = container.querySelectorAll('.tab-panel');
          panels.forEach(panel => {
            panel.classList.toggle('active', panel.id === targetId);
          });
        });
      });
    });
  },

  /**
   * Initializes theme management using data attributes for AI predictability.
   * Manages theme state via localStorage and html[data-theme] attribute.
   * Configurable via data attributes on theme toggle elements.
   */
  initTheme() {
    const config = {
      defaultTheme: 'dark',
      storageKey: 'theme',
      themes: ['light', 'dark', 'auto'],
      iconSelector: {
        light: '.sun-icon, [data-theme-icon="light"]',
        dark: '.moon-icon, [data-theme-icon="dark"]',
        auto: '.system-icon, [data-theme-icon="auto"]'
      },
      autoDetect: true
    };
    
    // Override config with global settings if available
    if (window.StarlightConfig && window.StarlightConfig.theme) {
      Object.assign(config, window.StarlightConfig.theme);
    }

    const html = document.documentElement;

    /**
     * Updates the UI icons to match the target theme
     * @param {string} theme - The theme that is active (light, dark, or auto)
     * @param {string} effectiveTheme - The actual theme being displayed
     */
    const updateIcons = (theme, effectiveTheme) => {
      const hasAutoIcon = document.querySelector(config.iconSelector.auto) !== null;
      
      config.themes.forEach(t => {
        const selector = config.iconSelector[t];
        if (selector) {
          document.querySelectorAll(selector).forEach(icon => {
            if (theme === 'auto') {
              // In auto mode, show system icon if it exists, otherwise show the effective theme icon
              const isAutoIcon = t === 'auto';
              const isEffectiveIcon = t === effectiveTheme;
              
              if (hasAutoIcon) {
                icon.classList.toggle('hidden', !isAutoIcon);
              } else {
                icon.classList.toggle('hidden', !isEffectiveIcon);
              }
            } else {
              icon.classList.toggle('hidden', t !== theme);
            }
          });
        }
      });
    };

    /**
     * Sets the theme and updates storage/UI
     * @param {string} theme - The theme to set (light, dark, or auto)
     * @param {string} source - Source of the change for event detail
     * @param {boolean} save - Whether to save the preference to localStorage
     */
    window.setTheme = (theme, source = 'api', save = true) => {
      if (!config.themes.includes(theme)) {
        console.warn(`Starlight: Theme "${theme}" is not supported.`);
        return;
      }

      const previousTheme = localStorage.getItem(config.storageKey) || (config.autoDetect ? 'auto' : config.defaultTheme);
      let effectiveTheme = theme;

      if (theme === 'auto' && config.autoDetect) {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        localStorage.setItem(`${config.storageKey}-effective`, effectiveTheme);
      } else {
        localStorage.removeItem(`${config.storageKey}-effective`);
      }

      // Apply to DOM
      html.setAttribute('data-theme', effectiveTheme);
      document.body.classList.toggle('light-mode', effectiveTheme === 'light');
      document.body.classList.toggle('dark-mode', effectiveTheme === 'dark');
      
      // Save preference
      if (save) {
        localStorage.setItem(config.storageKey, theme);
      }
      
      // Update icons
      updateIcons(theme, effectiveTheme);

      // Dispatch event
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme, effectiveTheme, previousTheme, source }
      }));

      return theme;
    };

    /**
     * Cycles to the next available theme
     */
    window.toggleTheme = () => {
      const currentTheme = localStorage.getItem(config.storageKey) || (config.autoDetect ? 'auto' : config.defaultTheme);
      const currentIndex = config.themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % config.themes.length;
      const nextTheme = config.themes[nextIndex];
      
      return window.setTheme(nextTheme, 'toggle');
    };

    // Initialize individual toggles
    const createThemeToggle = (element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    };

    // Auto-detect system theme changes
    if (config.autoDetect) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem(config.storageKey);
        const currentActiveTheme = savedTheme || 'auto';
        
        if (currentActiveTheme === 'auto') {
          const newEffective = e.matches ? 'light' : 'dark';
          
          // Apply to DOM
          html.setAttribute('data-theme', newEffective);
          document.body.classList.toggle('light-mode', newEffective === 'light');
          document.body.classList.toggle('dark-mode', newEffective === 'dark');
          
          localStorage.setItem(`${config.storageKey}-effective`, newEffective);
          updateIcons('auto', newEffective);
          
          window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: 'auto', effectiveTheme: newEffective, source: 'system' }
          }));
        }
      });
    }

    // Initialize UI
    document.querySelectorAll('.theme-toggle, [data-theme-toggle]').forEach(createThemeToggle);

    // Set initial theme
    const savedTheme = localStorage.getItem(config.storageKey);
    if (savedTheme) {
      window.setTheme(savedTheme, 'init');
    } else {
      window.setTheme(config.autoDetect ? 'auto' : config.defaultTheme, 'init', false);
    }
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
    Starlight.initTheme();
  });
}
