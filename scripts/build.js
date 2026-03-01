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
      'quantum-base.css',
      'quantum-responsive.css', 
      'quantum-components.css',
      'quantum-animations.css',
      'starlight.css'
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
 * QuantumCSS + Starlight UI v1.6.2 - Advanced Utility-First CSS Framework
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
    <script src="../src/starlight.js"></script>
    <style>
        .token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
        .swatch { height: 4rem; border-radius: 0.5rem; margin-bottom: 0.5rem; border: 1px solid rgba(0,0,0,0.1); }
        .spacing-bar { height: 1rem; background: var(--q-color-starlight-blue, #3b82f6); border-radius: 0.25rem; }
        section { margin-bottom: 4rem; }
        h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        body.light-mode h2 { border-bottom-color: rgba(0,0,0,0.1); }
        .token-name { font-family: monospace; font-size: 0.875rem; opacity: 0.7; }
        .token-value { font-size: 0.75rem; opacity: 0.5; }
        .ani-card { background: #0f172a; color: white; transition: all 0.3s; }
        body.light-mode .ani-card { background: #f1f5f9; color: #0f172a; }
        .ani-orbit-star { background-color: white; }
        body.light-mode .ani-orbit-star { background-color: var(--q-color-starlight-blue, #2563eb); }
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
    <button class="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">
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
            <p class="mb-6 opacity-70">Atomic and molecular utility compositions for individual elements.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${Object.entries(config.componentPresets)
                    .filter(([name]) => !name.startsWith('starlight-'))
                    .map(([name, utilities]) => {
                    let example = `<button class="${name}">Preset Button</button>`;
                    
                    if (name.includes('nav')) {
                        example = `<nav class="${name} rounded-lg overflow-hidden"><div class="p-4 flex justify-between items-center"><span class="font-bold">Logo</span><div class="flex gap-4 text-xs"><span>Link 1</span><span>Link 2</span></div></div></nav>`;
                    } else if (name.includes('search')) {
                        example = `<div class="${name}"><svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><input type="text" class="input-starlight search-input" placeholder="Search..."></div>`;
                    } else if (name.includes('grid') || name.includes('dashboard')) {
                        example = `<div class="${name} w-full"><div class="starlight-card p-4 text-center">A</div><div class="starlight-card p-4 text-center">B</div><div class="starlight-card p-4 text-center">C</div></div>`;
                    } else if (name.includes('gallery')) {
                        example = `<div class="${name} w-full">${[1,2,3,4].map(i => `<div class="gallery-item"><div class="absolute inset-0 bg-starlight/10 flex items-center justify-center text-2xs opacity-50">IMAGE ${i}</div></div>`).join('')}</div>`;
                    } else if (name.includes('form')) {
                        example = `<div class="${name} w-full"><div class="flex flex-col gap-2"><label class="text-[10px] uppercase font-bold opacity-50">Field A</label><input class="input-starlight" placeholder="Value..."></div><div class="form-row"><span class="text-xs">Option B</span><label class="toggle toggle-starlight"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></div></div>`;
                    } else if (name.includes('dialog')) {
                        example = `<div class="${name}"><button class="dialog-close" style="top:1rem; right:1rem;"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg></button><h4 class="font-bold mb-2">Dialog Title</h4><p class="text-sm opacity-70 mb-4">Sample content for the dialog preset.</p><div class="flex gap-4"><button class="btn-starlight flex-1">Action</button><button class="btn-secondary flex-1">Cancel</button></div></div>`;
                    } else if (name.includes('card')) {
                        example = `<div class="${name}"><h4 class="font-bold">Preset Card</h4><p class="text-sm opacity-70">Using ${name}</p></div>`;
                    }

                    return `
                    <div class="starlight-card p-6">
                        <div class="mb-4 flex justify-between items-center">
                            <span class="token-name">.${name}</span>
                            <span class="text-[10px] opacity-50 uppercase font-bold">Preset</span>
                        </div>
                        <div class="flex items-center justify-center p-8 bg-slate-500/10 rounded-lg mb-4">
                            ${example}
                        </div>
                        <div class="token-value text-xs bg-black/20 p-3 rounded font-mono">${utilities}</div>
                    </div>
                `}).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Components Section -->
        <section>
            <h2>Component Utilities</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">`;

    Object.keys(utilityMaps).forEach(cls => {
      // Skip high-level presets which are displayed in their own section below
      if (['starlight-nav', 'starlight-search', 'starlight-dashboard', 'starlight-gallery', 'starlight-form', 'starlight-dialog'].includes(cls)) return;

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

        <!-- High-Level Presets -->
        <section>
            <h2>High-Level Component Presets</h2>
            <p class="mb-6 opacity-70">Semantic classes that compose multiple utilities for rapid AI-driven development.</p>
            <div class="grid grid-cols-1 gap-12">
                <!-- Navigation -->
                <div class="starlight-card p-0 mb-12">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Navigation Menu (.starlight-nav)</div>
                    <div class="relative">
                        <nav class="starlight-nav relative">
                            <div class="p-4 md:px-8 flex justify-between items-center w-full">
                                <div class="font-bold text-xl text-gradient-starlight">Starlight OS</div>
                                <div class="flex items-center gap-8">
                                    <div class="nav-desktop">
                                        <ul class="nav-list">
                                            <li><a href="#" class="nav-link">Fleet</a></li>
                                            <li>
                                                <div class="dropdown">
                                                    <a href="#" class="nav-link">Stations ▾</a>
                                                    <div class="dropdown-menu">
                                                        <a href="#" class="dropdown-item">Alpha Base</a>
                                                        <a href="#" class="dropdown-item">Delta Outpost</a>
                                                        <a href="#" class="dropdown-item">Omega Point</a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li><a href="#" class="nav-link">Resources</a></li>
                                        </ul>
                                    </div>
                                    <div class="hamburger">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                            <!-- Mobile Menu -->
                            <div class="nav-menu-mobile">
                                <ul class="nav-list vertical">
                                    <li><a href="#" class="nav-link">Fleet</a></li>
                                    <li>
                                        <div class="dropdown">
                                            <a href="#" class="nav-link">Stations ▾</a>
                                            <div class="dropdown-menu">
                                                <a href="#" class="dropdown-item">Alpha Base</a>
                                                <a href="#" class="dropdown-item">Delta Outpost</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li><a href="#" class="nav-link">Resources</a></li>
                                </ul>
                            </div>
                        </nav>
                        <div class="p-12 text-center opacity-50 italic text-sm border-t border-white/5 light:bg-slate-300">Horizontal layout (standard)</div>
                    </div>
                </div>

                <!-- Vertical Navigation -->
                <div class="starlight-card p-0">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Vertical Sidebar (.starlight-nav.vertical)</div>
                    <div class="flex h-[400px] overflow-hidden">
                        <nav class="starlight-nav vertical static border-r border-white/10">
                            <div class="font-bold text-xl text-gradient-starlight mb-8">Starlight OS</div>
                            <div class="nav-desktop block w-full">
                                <ul class="nav-list vertical w-full">
                                    <li><a href="#" class="nav-link">Fleet</a></li>
                                    <li>
                                        <div class="dropdown">
                                            <a href="#" class="nav-link">Stations ▾</a>
                                            <div class="dropdown-menu">
                                                <a href="#" class="dropdown-item">Alpha Base</a>
                                                <a href="#" class="dropdown-item">Delta Outpost</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li><a href="#" class="nav-link">Resources</a></li>
                                    <li><a href="#" class="nav-link">Analytics</a></li>
                                </ul>
                            </div>
                        </nav>
                        <div class="flex-1 p-8 opacity-50 italic text-sm overflow-y-auto light:bg-slate-300">Dashboard content area...</div>
                    </div>
                </div>

                <!-- Search -->
                <div class="starlight-card p-0 overflow-hidden">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Interactive Search (.starlight-search)</div>
                    <div class="p-12 flex flex-col items-center gap-6">
                        <div class="starlight-search">
                            <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" class="input-starlight search-input" placeholder="Search the cosmos...">
                        </div>
                        <p class="text-sm text-muted">A glassmorphic search bar with integrated iconography.</p>
                    </div>
                </div>

                <!-- Dashboard -->
                <div class="starlight-card p-0 overflow-hidden">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Dashboard Grid (.starlight-dashboard)</div>
                    <div class="p-8">
                        <div class="starlight-dashboard">
                            <div class="starlight-card stat-card light:shadow-lg">
                                <span class="stat-label">Core Stability</span>
                                <span class="stat-value">98.4%</span>
                                <div class="stat-trend up">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    2.1%
                                </div>
                            </div>
                            <div class="starlight-card stat-card light:shadow-lg">
                                <span class="stat-label">Neural Sync</span>
                                <span class="stat-value">Active</span>
                                <div class="stat-trend up">
                                    <div class="w-2 h-2 bg-success rounded-full ani-cosmic-pulse mr-1"></div>
                                    Optimal
                                </div>
                            </div>
                            <div class="starlight-card stat-card light:shadow-lg">
                                <span class="stat-label">Latency</span>
                                <span class="stat-value">12ms</span>
                                <div class="stat-trend down">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    0.4%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gallery -->
                <div class="starlight-card p-0 overflow-hidden">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Gallery Widget (.starlight-gallery)</div>
                    <div class="p-8">
                        <div class="starlight-gallery">
                            <div class="gallery-item">
                                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Nebula">
                                <div class="gallery-overlay"><span class="text-xs font-bold uppercase tracking-widest">Orion</span></div>
                            </div>
                            <div class="gallery-item">
                                <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80" alt="Earth">
                                <div class="gallery-overlay"><span class="text-xs font-bold uppercase tracking-widest">Terra</span></div>
                            </div>
                            <div class="gallery-item">
                                <img src="https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=800&q=80" alt="Galaxy">
                                <div class="gallery-overlay"><span class="text-xs font-bold uppercase tracking-widest">Andromeda</span></div>
                            </div>
                            <div class="gallery-item">
                                <img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80" alt="Deep Space">
                                <div class="gallery-overlay"><span class="text-xs font-bold uppercase tracking-widest">Void</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="starlight-card p-0 overflow-hidden">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Advanced Form (.starlight-form)</div>
                    <div class="p-8">
                        <div class="starlight-form">
                            <div class="flex flex-col gap-4">
                                <label class="text-sm font-semibold opacity-70">Mission Designation</label>
                                <input type="text" class="input-starlight" placeholder="Enter codename...">
                                <label class="text-sm font-semibold opacity-70">Warp Factor</label>
                                <input type="range" class="range-starlight" min="1" max="9" step="0.1">
                            </div>
                            <div class="flex flex-col gap-6">
                                <div class="form-row">
                                    <div>
                                        <div class="font-semibold">Cloaking Device</div>
                                        <div class="text-[10px] opacity-50">Stealth mode activation</div>
                                    </div>
                                    <label class="toggle toggle-starlight"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>
                                </div>
                                <div class="flex gap-4 mt-auto">
                                    <button class="btn-starlight flex-1">Launch</button>
                                    <button class="btn-secondary">Abort</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dialog -->
                <div class="starlight-card p-0">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Dialog Window (.starlight-dialog)</div>
                    <div class="p-8">
                        <!-- Inline Preview -->
                        <div class="dialog-base theme-glass-dark relative mx-auto mb-8 shadow-none border-white/10" style="max-width: 500px;">
                            <h3 class="text-xl font-bold mb-4 text-gradient-starlight">System Preview</h3>
                            <p class="mb-6 opacity-70 text-sm">This is an inline preview of the dialog component. It scales to fit its container.</p>
                            <div class="flex gap-4">
                                <button class="btn-starlight btn-sm flex-1">Action</button>
                                <button class="btn-secondary btn-sm flex-1">Cancel</button>
                            </div>
                        </div>
                        
                        <div class="text-center pt-4 border-t border-white/5">
                            <button class="btn-starlight" onclick="toggleDialog(true)">Launch Overlay Dialog</button>
                        </div>
                    </div>
                </div>

                <!-- Accordion -->
                <div class="starlight-card p-0 overflow-hidden">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Accordion Group (.accordion-starlight)</div>
                    <div class="p-8">
                        <div class="accordion-group max-w-2xl mx-auto">
                            <div class="accordion-item accordion-starlight active">
                                <div class="accordion-header">
                                    <span>Cosmic Manifestation</span>
                                    <svg class="accordion-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                                <div class="accordion-content">
                                    <p>The universe began as a singularity of infinite density and heat, expanding rapidly in a cosmic event known as the Big Bang.</p>
                                </div>
                            </div>
                            <div class="accordion-item accordion-starlight">
                                <div class="accordion-header">
                                    <span>Neural Synchronization</span>
                                    <svg class="accordion-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                                <div class="accordion-content">
                                    <p>Advanced neural interfaces allow for near-instantaneous data transfer between organic consciousness and digital mesh networks.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="starlight-card p-0 overflow-hidden">
                    <div class="p-4 border-b border-white/5 bg-white/5 text-[10px] uppercase font-bold tracking-widest opacity-50">Tab Interface (.tab-list)</div>
                    <div class="p-8">
                        <div class="max-w-2xl mx-auto">
                            <div class="tab-list mb-4">
                                <button class="tab-button active" data-tab="tab-overview">Overview</button>
                                <button class="tab-button" data-tab="tab-specs">Specifications</button>
                                <button class="tab-button" data-tab="tab-logs">System Logs</button>
                            </div>
                            <div class="tab-content glass p-6 rounded-xl">
                                <div class="tab-panel active" id="tab-overview">
                                    <h4 class="text-lg font-bold mb-2">Fleet Overview</h4>
                                    <p class="text-sm opacity-70">Current status: All systems nominal. 24 vessels in active sector.</p>
                                </div>
                                <div class="tab-panel" id="tab-specs">
                                    <h4 class="text-lg font-bold mb-2">Technical Specs</h4>
                                    <ul class="text-sm opacity-70 list-disc pl-5">
                                        <li>Core Engine: Antimatter Warp v4</li>
                                        <li>Hull Plating: Reinforced Tritanium</li>
                                        <li>Shields: Multi-phasic Harmonic</li>
                                    </ul>
                                </div>
                                <div class="tab-panel" id="tab-logs">
                                    <div class="font-mono text-xs opacity-60">
                                        [12:04:33] Nebula drive initiated<br>
                                        [12:05:12] Synchronization complete<br>
                                        [12:10:04] Entering silent running mode
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="mt-20 pt-8 border-t border-white/10 opacity-50 text-sm">
            Generated by Quantum CSS Dynamic Docs · ${new Date().toLocaleDateString()}
        </footer>
    </div>

    <!-- Dialog Overlay (Moved to bottom to prevent clipping) -->
    <div class="dialog-overlay hidden" id="systemDialog">
        <div class="starlight-dialog">
            <button class="dialog-close" onclick="toggleDialog(false)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 class="text-2xl font-bold mb-4 text-gradient-starlight">System Override</h3>
            <p class="mb-6 opacity-70">You are about to bypass safety protocols. This action is irreversible.</p>
            <div class="bg-black/20 p-4 rounded-lg mb-6 font-mono text-xs border border-white/5">
                <div class="text-success">> STATUS: AUTHORIZED</div>
                <div class="text-success">> CORE: ACCESSIBLE</div>
            </div>
            <div class="flex gap-4">
                <button class="btn-starlight flex-1" onclick="toggleDialog(false)">Confirm</button>
                <button class="btn-secondary flex-1" onclick="toggleDialog(false)">Abort</button>
            </div>
        </div>
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
