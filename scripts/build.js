const fs = require('fs');
const path = require('path');
const { generateCSS } = require('../src/generator');
const { defaultTheme, utilityMaps } = require('../src/defaults');

class QuantumCSSBuilder {
  constructor(config = {}) {
    this.config = {
      inputDir: path.resolve(__dirname, '../src/styles'),
      outputFile: path.resolve(__dirname, '../dist/quantum.min.css'),
      configPath: path.resolve(__dirname, '../quantum.config.json'),
      minify: false,
      watch: false,
      analyze: false,
      ...config
    };
    
    this.cssFiles = [
      'quantum.css',
      'quantum-responsive.css', 
      'quantum-components.css',
      'quantum-animations.css',
      'starlight-ui.css'
    ];
  }

  // Simple CSS minifier
  minifyCSS(css) {
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove whitespace
      .replace(/\s+/g, ' ')
      // Remove semicolons before closing braces
      .replace(/;}/g, '}')
      // Remove space around braces
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      // Remove space around colons and semicolons
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      // Remove space around commas
      .replace(/\s*,\s*/g, ',')
      .trim();
  }

  // Read and combine CSS files
  async buildCSS() {
    let combinedCSS = '';
    let totalSize = 0;
    
    console.log('🚀 Building QuantumCSS...');
    
    // 1. Load static CSS files
    for (const file of this.cssFiles) {
      const filePath = path.join(this.config.inputDir, file);
      
      if (fs.existsSync(filePath)) {
        const css = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);
        
        combinedCSS += css + '\n';
        totalSize += stats.size;
        
        console.log(`✓ Loaded static ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
      } else {
        console.warn(`⚠️  Static file not found: ${filePath}`);
      }
    }

    // 2. Run JIT Generator
    console.log('✨ Running JIT Generator...');
    try {
      const jitCSS = generateCSS(this.config.configPath);
      combinedCSS += '\n/* JIT Generated Utilities */\n' + jitCSS;
      console.log(`✓ JIT Utilities generated`);
    } catch (error) {
      console.error('❌ JIT Generation failed:', error.message);
    }

    // Add banner
    const banner = `/*!
 * QuantumCSS v1.0.0 - Advanced Utility-First CSS Framework
 * https://github.com/macroadster/quantumcss
 * Copyright (c) 2026 Eric Yang
 * License: MIT
 */\n\n`;

    combinedCSS = banner + combinedCSS;

    // Minify if requested
    if (this.config.minify) {
      console.log('🔧 Minifying CSS...');
      combinedCSS = this.minifyCSS(combinedCSS);
    }

    // Write output file
    const outputPath = this.config.outputFile;
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, combinedCSS);
    
    const outputStats = fs.statSync(outputPath);
    const compressionRatio = totalSize > 0 ? ((totalSize - outputStats.size) / totalSize * 100).toFixed(1) : 0;
    
    console.log(`✨ Build complete!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Final Size: ${(outputStats.size / 1024).toFixed(2)} KB`);
    
    // Analyze if requested
    if (this.config.analyze) {
      this.analyzeCSS(combinedCSS);
    }
    
    return combinedCSS;
  }

  // Generate dynamic documentation (Kitchen Sink)
  generateDocs() {
    console.log('📖 Generating dynamic documentation...');
    
    const configPath = this.config.configPath;
    const config = fs.existsSync(configPath) ? require(configPath) : { theme: {} };
    
    const theme = JSON.parse(JSON.stringify(defaultTheme || {}));
    theme.colors = theme.colors || {};
    theme.spacing = theme.spacing || {};
    theme.borderRadius = theme.borderRadius || {};
    theme.fontSize = theme.fontSize || {};
    theme.shadows = theme.shadows || {};

    if (config.theme && config.theme.extend) {
      const ext = config.theme.extend;
      if (ext.colors) Object.assign(theme.colors, ext.colors);
      if (ext.spacing) Object.assign(theme.spacing, ext.spacing);
      if (ext.borderRadius) Object.assign(theme.borderRadius, ext.borderRadius);
      if (ext.fontSize) Object.assign(theme.fontSize, ext.fontSize);
      if (ext.boxShadow) Object.assign(theme.shadows, ext.boxShadow);
    }

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantum CSS - Kitchen Sink</title>
    <link rel="stylesheet" href="../dist/quantum.min.css">
    <style>
        .token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
        .swatch { height: 4rem; border-radius: 0.5rem; margin-bottom: 0.5rem; border: 1px solid rgba(0,0,0,0.1); }
        .spacing-bar { height: 1rem; background: var(--color-starlight-blue, #3b82f6); border-radius: 0.25rem; }
        section { margin-bottom: 4rem; }
        h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        body.light-mode h2 { border-bottom-color: rgba(0,0,0,0.1); }
        .token-name { font-family: monospace; font-size: 0.875rem; opacity: 0.7; }
        .token-value { font-size: 0.75rem; opacity: 0.5; }
        .ani-card { background: #0f172a; color: white; transition: all 0.3s; }
        body.light-mode .ani-card { background: #f1f5f9; color: #0f172a; }
        .ani-orbit-star { background-color: white; }
        body.light-mode .ani-orbit-star { background-color: var(--color-starlight-blue, #2563eb); }
        .theme-toggle { 
            position: fixed; top: 2rem; right: 2rem; z-index: 100; cursor: pointer; 
            width: 3rem; height: 3rem; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center;
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); 
            color: white; transition: all 0.3s ease; backdrop-filter: blur(10px); 
        }
        .theme-toggle:hover { background: rgba(255,255,255,0.15); transform: scale(1.1); }
        body.light-mode .theme-toggle { background: rgba(0,0,0,0.02); border-color: rgba(0,0,0,0.1); color: #0f172a; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        body.light-mode .theme-toggle:hover { background: #f8fafc; }
        .sun-icon { display: none; }
        body.light-mode .sun-icon { display: block; }
        body.light-mode .moon-icon { display: none; }
    </style>
</head>
<body class="p-8">
    <button class="theme-toggle" onclick="document.body.classList.toggle('light-mode')" title="Toggle Theme">
        <svg class="w-6 h-6 sun-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path></svg>
        <svg class="w-6 h-6 moon-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
    </button>
    
    <div class="max-w-6xl mx-auto">
        <header class="mb-12">
            <h1 class="text-5xl font-bold tracking-tight mb-2">Kitchen Sink</h1>
            <p class="text-xl opacity-70">Dynamic documentation of all design tokens and components.</p>
        </header>

        <!-- Colors Section -->
        <section>
            <h2>Colors</h2>
            <div class="token-grid">`;

    Object.entries(theme.colors).forEach(([name, value]) => {
      if (typeof value === 'string') {
        html += `
                <div>
                    <div class="swatch" style="background-color: ${value};"></div>
                    <div class="token-name">${name}</div>
                    <div class="token-value">${value}</div>
                </div>`;
      } else {
        Object.entries(value).forEach(([shade, hex]) => {
          html += `
                <div>
                    <div class="swatch" style="background-color: ${hex};"></div>
                    <div class="token-name">${name}-${shade}</div>
                    <div class="token-value">${hex}</div>
                </div>`;
        });
      }
    });

    html += `
            </div>
        </section>

        <!-- Typography Section -->
        <section>
            <h2>Typography (Font Sizes)</h2>
            <div class="flex flex-col gap-8">`;

    Object.entries(theme.fontSize).forEach(([name, size]) => {
      html += `
                <div class="flex items-center gap-4">
                    <div class="w-24 token-name">${name} (${size})</div>
                    <div class="text-${name}">The quick brown fox jumps over the lazy dog.</div>
                </div>`;
    });

    html += `
            </div>
        </section>

        <!-- Spacing Section -->
        <section>
            <h2>Spacing</h2>
            <div class="flex flex-col gap-4">`;

    Object.entries(theme.spacing).sort((a, b) => {
      const valA = a[1].includes('rem') ? parseFloat(a[1]) * 16 : parseFloat(a[1]);
      const valB = b[1].includes('rem') ? parseFloat(b[1]) * 16 : parseFloat(b[1]);
      return valA - valB;
    }).forEach(([name, value]) => {
      html += `
                <div class="flex items-center gap-4">
                    <div class="w-24 token-name">${name} (${value})</div>
                    <div class="spacing-bar" style="width: ${value}"></div>
                </div>`;
    });

    html += `
            </div>
        </section>

        <!-- Border Radius Section -->
        <section>
            <h2>Border Radius</h2>
            <div class="token-grid">`;

    Object.entries(theme.borderRadius).forEach(([name, value]) => {
      html += `
                <div class="text-center">
                    <div class="w-20 h-20 bg-blue-100 mx-auto mb-2 border border-blue-200" style="border-radius: ${value}"></div>
                    <div class="token-name">${name}</div>
                    <div class="token-value">${value}</div>
                </div>`;
    });

    html += `
            </div>
        </section>

        <!-- Shadows Section -->
        <section>
            <h2>Shadows</h2>
            <div class="token-grid">`;

    Object.entries(theme.shadows).forEach(([name, value]) => {
      html += `
                <div class="text-center">
                    <div class="w-32 h-32 bg-white mx-auto mb-4 rounded-lg" style="box-shadow: ${value}"></div>
                    <div class="token-name">${name}</div>
                </div>`;
    });

    html += `
            </div>
        </section>

        <!-- Animations Section -->
        <section>
            <h2>Cosmic Animations</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="ani-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
                    <div class="w-16 h-16 bg-starlight rounded-full ani-float"></div>
                    <div class="token-name">ani-float</div>
                </div>
                <div class="ani-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
                    <div class="w-16 h-16 bg-blue-500 rounded-full ani-cosmic-pulse"></div>
                    <div class="token-name">ani-cosmic-pulse</div>
                </div>
                <div class="ani-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
                    <div class="w-16 h-16 bg-orange-500 rounded-full ani-twinkle"></div>
                    <div class="token-name">ani-twinkle</div>
                </div>
                <div class="ani-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden h-48">
                    <div class="absolute inset-0 ani-nebula"></div>
                    <div class="relative token-name">ani-nebula</div>
                </div>
                <div class="ani-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
                    <div class="w-4 h-4 ani-orbit-star rounded-full ani-orbit"></div>
                    <div class="token-name">ani-orbit</div>
                </div>
                <div class="ani-card p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
                    <svg width="60" height="60" viewBox="0 0 100 100" class="text-starlight">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="4" fill="none" class="ani-svg-draw" />
                    </svg>
                    <div class="token-name">ani-svg-draw</div>
                </div>
            </div>
        </section>

        <!-- Badges Section -->
        <section>
            <h2>Badges</h2>
            <div class="flex flex-wrap gap-4">
                <span class="badge badge-primary">Primary</span>
                <span class="badge badge-secondary">Secondary</span>
                <span class="badge badge-success">Success</span>
                <span class="badge badge-warning">Warning</span>
                <span class="badge badge-error">Error</span>
            </div>
        </section>

        <!-- Presets Section -->
        ${config.componentPresets ? `
        <section>
            <h2>Component Presets</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${Object.entries(config.componentPresets).map(([name, utilities]) => `
                    <div class="starlight-card p-6">
                        <div class="mb-4 flex justify-between items-center">
                            <span class="token-name">.${name}</span>
                            <span class="text-[10px] opacity-50 uppercase font-bold">Preset</span>
                        </div>
                        <div class="flex items-center justify-center p-8 bg-slate-500/10 rounded-lg mb-4">
                            ${name.includes('card') ? `
                                <div class="${name}">
                                    <h4 class="font-bold">Preset Card</h4>
                                    <p class="text-sm opacity-70">Using ${name}</p>
                                </div>
                            ` : `
                                <button class="${name}">Preset Button</button>
                            `}
                        </div>
                        <div class="token-value text-xs bg-black/20 p-3 rounded font-mono">${utilities}</div>
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Components Section -->
        <section>
            <h2>Component Utilities</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">`;

    Object.keys(utilityMaps).forEach(cls => {
      if (cls.startsWith('btn-') || cls.startsWith('input-') || cls === 'glass' || cls === 'bg-starlight' || cls.includes('gradient')) {
        html += `
                <div class="starlight-card p-6">
                    <div class="mb-4 token-name">${cls}</div>
                    <div class="flex items-center justify-center p-8 bg-slate-500/10 rounded-lg">
                        ${cls.startsWith('btn-') ? `<button class="${cls}">Button Example</button>` : 
                          cls.startsWith('input-') ? `<input class="${cls}" placeholder="Input Example">` :
                          cls === 'glass' ? `<div class="${cls} p-8 rounded-xl border border-white/20">Glass Effect</div>` :
                          `<div class="${cls} p-8 rounded-xl w-full text-center">Example Block</div>`
                        }
                    </div>
                </div>`;
      }
    });

    html += `
            </div>
        </section>

        <!-- Interactive Search -->
        <section>
            <h2>Interactive Search</h2>
            <div class="starlight-card p-8 flex flex-col items-center gap-6">
                <div class="search-container">
                    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" class="input-starlight search-input" placeholder="Search the galaxy...">
                </div>
                <p class="text-sm text-muted">A glassmorphic search bar with integrated iconography.</p>
            </div>
        </section>

        <!-- Navigation & Menu -->
        <section>
            <h2>Navigation & Menus</h2>
            <div class="starlight-card p-0 overflow-hidden">
                <nav class="nav-glass">
                    <div class="font-bold text-xl text-gradient-starlight">Starlight.ai</div>
                    <div class="flex items-center gap-4">
                        <div class="hidden md:flex gap-6 text-sm">
                            <a href="#">Fleet</a>
                            <a href="#">Stations</a>
                            <a href="#">Resources</a>
                        </div>
                        <div class="hamburger" id="menuToggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="nav-menu-mobile" id="mobileMenu">
                        <div class="flex flex-col gap-2">
                            <button class="dropdown-item">Dashboard</button>
                            <button class="dropdown-item">Missions</button>
                            <button class="dropdown-item">Cargo</button>
                            <hr class="border-white/10 my-1">
                            <button class="dropdown-item text-error">System Shutdown</button>
                        </div>
                    </div>
                </nav>
                <div class="p-20 text-center opacity-50">
                    Scroll context for sticky navigation
                </div>
            </div>
        </section>

        <!-- Dashboard Widgets -->
        <section>
            <h2>Dashboard Widgets</h2>
            <div class="dashboard-grid">
                <div class="starlight-card stat-card">
                    <span class="stat-label">Core Stability</span>
                    <span class="stat-value">98.4%</span>
                    <div class="stat-trend up">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        2.1%
                    </div>
                </div>
                <div class="starlight-card stat-card">
                    <span class="stat-label">Fuel Reserves</span>
                    <span class="stat-value">12.8k</span>
                    <div class="stat-trend down">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        0.4%
                    </div>
                </div>
                <div class="starlight-card stat-card">
                    <span class="stat-label">Neural Sync</span>
                    <span class="stat-value">Active</span>
                    <div class="stat-trend up">
                        <div class="w-2 h-2 bg-success rounded-full ani-cosmic-pulse mr-1"></div>
                        Optimal
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery Widget -->
        <section>
            <h2>Gallery Widget</h2>
            <div class="starlight-gallery">
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Nebula">
                    <div class="gallery-overlay">
                        <span class="text-xs font-bold uppercase tracking-widest">Orion Nebula</span>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80" alt="Earth">
                    <div class="gallery-overlay">
                        <span class="text-xs font-bold uppercase tracking-widest">Blue Marble</span>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=800&q=80" alt="Galaxy">
                    <div class="gallery-overlay">
                        <span class="text-xs font-bold uppercase tracking-widest">Andromeda</span>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80" alt="Deep Space">
                    <div class="gallery-overlay">
                        <span class="text-xs font-bold uppercase tracking-widest">Void</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Comprehensive Forms -->
        <section>
            <h2>Advanced Form Controls</h2>
            <div class="starlight-card">
                <form class="grid grid-cols-1 md:grid-cols-2 gap-8" onsubmit="return false">
                    <div class="flex flex-col gap-4">
                        <label class="text-sm font-semibold opacity-70">Mission Designation</label>
                        <input type="text" class="input-starlight" placeholder="Enter codename...">
                        
                        <label class="text-sm font-semibold opacity-70">Sector Selection</label>
                        <select class="input-starlight select-starlight">
                            <option>Alpha Centauri</option>
                            <option>Betelgeuse</option>
                            <option>Kepler-186f</option>
                        </select>

                        <label class="text-sm font-semibold opacity-70">Warp Factor</label>
                        <input type="range" class="range-starlight" min="1" max="9" step="0.1">
                        <div class="flex justify-between text-xs opacity-50">
                            <span>Sub-light</span>
                            <span>Trans-warp</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-semibold">Cloaking Device</div>
                                <div class="text-xs opacity-50">Renders vessel invisible to radar</div>
                            </div>
                            <label class="toggle toggle-starlight">
                                <input type="checkbox" class="toggle-input">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>

                        <div class="flex flex-col gap-3">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" class="checkbox-starlight" checked>
                                <span class="text-sm">Auto-pilot engaged</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" class="checkbox-starlight">
                                <span class="text-sm">Shields at maximum</span>
                            </label>
                        </div>

                        <div class="flex gap-4 mt-auto">
                            <button class="btn-starlight flex-1">Launch Mission</button>
                            <button class="btn-secondary">Save Draft</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>

        <!-- Dialog Section -->
        <section>
            <h2>Dialog Windows</h2>
            <div class="starlight-card p-12 text-center">
                <button class="btn-starlight btn-lg" onclick="toggleDialog(true)">Open System Override</button>
            </div>

            <!-- Dialog Overlay -->
            <div class="dialog-overlay hidden" id="systemDialog">
                <div class="dialog-content q-animate-scale-in">
                    <h3 class="text-2xl font-bold mb-4 text-gradient-starlight">System Override</h3>
                    <p class="mb-6 opacity-70">You are about to bypass the safety protocols of the main reactor. This action is irreversible and may lead to catastrophic failure.</p>
                    
                    <div class="bg-black/40 p-4 rounded-lg mb-6 border border-white/5 font-mono text-xs">
                        <div class="text-success">> Initiating bypass...</div>
                        <div class="text-success">> Cracking encryption...</div>
                        <div class="text-warning">> Warning: Thermal limits approaching</div>
                    </div>

                    <div class="flex gap-4">
                        <button class="btn-starlight flex-1" onclick="toggleDialog(false)">Confirm Override</button>
                        <button class="btn-secondary" onclick="toggleDialog(false)">Abort Mission</button>
                    </div>
                </div>
            </div>
        </section>

        <footer class="mt-20 pt-8 border-t border-white/10 opacity-50 text-sm">
            Generated by Quantum CSS Dynamic Docs · ${new Date().toLocaleDateString()}
        </footer>
    </div>

    <script>
        // Dialog Toggle
        function toggleDialog(show) {
            const dialog = document.getElementById('systemDialog');
            if (show) {
                dialog.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                dialog.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
                    mobileMenu.classList.remove('active');
                }
            });
        }

        // Close dialog on overlay click
        const systemDialog = document.getElementById('systemDialog');
        if (systemDialog) {
            systemDialog.addEventListener('click', (e) => {
                if (e.target === systemDialog) {
                    toggleDialog(false);
                }
            });
        }
    </script>
</body>
</html>`;

    const outputPath = path.resolve(__dirname, '../examples/kitchen-sink.html');
    fs.writeFileSync(outputPath, html);
    console.log(`✓ Kitchen Sink generated at ${outputPath}`);
  }

  // Analyze CSS statistics
  analyzeCSS(css) {
    console.log('\n📊 CSS Analysis:');
    
    // Count selectors
    const selectors = css.match(/[^{}]+(?={)/g) || [];
    console.log(`   Selectors: ${selectors.length}`);
    
    // Count properties
    const properties = css.match(/[^:]+(?=:)/g) || [];
    console.log(`   Properties: ${properties.length}`);
    
    // Count utility classes
    const utilityClasses = css.match(/\.[a-zA-Z][a-zA-Z0-9_-]+/g) || [];
    const uniqueUtilities = [...new Set(utilityClasses)];
    console.log(`   Utility Classes: ${uniqueUtilities.length}`);
    
    // Count component classes
    const componentClasses = css.match(/\.(btn|card|input|alert|badge|modal|tooltip|dropdown|accordion|tab|progress|toggle|spinner|skeleton)[a-zA-Z0-9_-]*/g) || [];
    const uniqueComponents = [...new Set(componentClasses)];
    console.log(`   Component Classes: ${uniqueComponents.length}`);
    
    // Count responsive variants
    const responsiveVariants = css.match(/(sm|md|lg|xl|2xl):/g) || [];
    console.log(`   Responsive Variants: ${responsiveVariants.length}`);
    
    // Count state variants
    const stateVariants = css.match(/(hover|focus|active|disabled|group-hover):/g) || [];
    console.log(`   State Variants: ${stateVariants.length}`);
    
    console.log('\n🎨 Color Usage:');
    const colors = css.match(/#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|hsl\([^)]+\)|var\(--[^)]+\)/g) || [];
    const uniqueColors = [...new Set(colors)];
    console.log(`   Unique Colors: ${uniqueColors.length}`);
    
    console.log('\n📱 Breakpoint Usage:');
    const breakpoints = {
      sm: (css.match(/@media.*640px|sm:/g) || []).length,
      md: (css.match(/@media.*768px|md:/g) || []).length,
      lg: (css.match(/@media.*1024px|lg:/g) || []).length,
      xl: (css.match(/@media.*1280px|xl:/g) || []).length,
      '2xl': (css.match(/@media.*1536px|2xl:/g) || []).length
    };
    
    Object.entries(breakpoints).forEach(([bp, count]) => {
      console.log(`   ${bp}: ${count} instances`);
    });
  }

  // Watch for file changes
  watch() {
    console.log('👀 Watching for changes...');
    
    const filesToWatch = [...this.cssFiles.map(f => path.join(this.config.inputDir, f))];
    if (fs.existsSync(this.config.configPath)) {
      filesToWatch.push(this.config.configPath);
    }

    filesToWatch.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.watchFile(filePath, () => {
          console.log(`📝 Changes detected in ${path.basename(filePath)}. Rebuilding...`);
          this.buildCSS().then(() => {
            if (this.config.docs || this.config.watch && this.config.dev) {
               this.generateDocs();
            }
          });
        });
      }
    });
  }

  // Generate development server
  startDevServer() {
    const http = require('http');
    const url = require('url');
    
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      let filePath = parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname.substring(1);
      
      // Default to index.html for missing paths
      if (!filePath.includes('.')) {
        filePath = 'index.html';
      }
      
      const fullPath = path.join(this.config.inputDir, filePath);
      
      try {
        if (fs.existsSync(fullPath)) {
          const stats = fs.statSync(fullPath);
          const ext = path.extname(fullPath);
          
          // Set content type
          const contentTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json'
          };
          
          res.writeHead(200, {
            'Content-Type': contentTypes[ext] || 'text/plain',
            'Content-Length': stats.size
          });
          
          const fileContent = fs.readFileSync(fullPath);
          res.end(fileContent);
          
          console.log(`🌐 Serving ${filePath}`);
        } else {
          res.writeHead(404);
          res.end('File not found');
        }
      } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500);
        res.end('Internal server error');
      }
    });
    
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Dev server running at http://localhost:${PORT}`);
      console.log(`📖 Open your browser to see the QuantumCSS examples`);
    });
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const config = {
    minify: false,
    watch: false,
    analyze: false,
    docs: false,
    dev: false
  };
  
  // Parse command line arguments
  args.forEach(arg => {
    switch (arg) {
      case '--minify':
      case '-m':
        config.minify = true;
        break;
      case '--watch':
      case '-w':
        config.watch = true;
        break;
      case '--analyze':
      case '-a':
        config.analyze = true;
        break;
      case '--docs':
        config.docs = true;
        break;
      case '--dev':
      case '-d':
        config.watch = true;
        config.minify = false;
        config.docs = true;
        config.dev = true;
        break;
    }
  });
  
  const builder = new QuantumCSSBuilder(config);
  
  if (config.watch && args.includes('--dev')) {
    builder.buildCSS().then(() => {
      builder.generateDocs();
      builder.watch();
      builder.startDevServer();
    });
  } else if (config.watch) {
    builder.buildCSS().then(() => {
      if (config.docs) builder.generateDocs();
      builder.watch();
    });
  } else {
    builder.buildCSS().then(() => {
      if (config.docs) builder.generateDocs();
    });
  }
}

// Export for use as module
module.exports = { QuantumCSSBuilder };

// Run if called directly
if (require.main === module) {
  main();
}
