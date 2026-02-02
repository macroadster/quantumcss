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
        :root { --bg: #ffffff; --text: #0f172a; --border: #eee; --card-bg: #f8fafc; }
        body.dark { --bg: #020617; --text: #f8fafc; --border: #1e293b; --card-bg: #0f172a; }
        
        body { background-color: var(--bg); color: var(--text); transition: background-color 0.3s, color 0.3s; }
        .token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
        .swatch { height: 4rem; border-radius: 0.5rem; margin-bottom: 0.5rem; border: 1px solid rgba(0,0,0,0.1); }
        .spacing-bar { height: 1rem; background: #3b82f6; border-radius: 0.25rem; }
        section { margin-bottom: 4rem; }
        h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; }
        .token-name { font-family: monospace; font-size: 0.875rem; color: var(--text); opacity: 0.7; }
        .token-value { font-size: 0.75rem; color: var(--text); opacity: 0.5; }
        .glass-preview { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); }
        .dark .glass-preview { background: rgba(0, 0, 0, 0.2); }
        .theme-toggle { position: fixed; top: 2rem; right: 2rem; z-index: 100; cursor: pointer; padding: 0.75rem; border-radius: 9999px; background: var(--card-bg); border: 1px solid var(--border); }
    </style>
</head>
<body class="p-8">
    <button class="theme-toggle" onclick="document.body.classList.toggle('dark')">🌓 Toggle Theme</button>
    
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
                <div class="bg-slate-900 p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-white">
                    <div class="w-16 h-16 bg-starlight rounded-full ani-float"></div>
                    <div class="token-name text-white/70">ani-float</div>
                </div>
                <div class="bg-slate-900 p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-white">
                    <div class="w-16 h-16 bg-blue-500 rounded-full ani-cosmic-pulse"></div>
                    <div class="token-name text-white/70">ani-cosmic-pulse</div>
                </div>
                <div class="bg-slate-900 p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-white">
                    <div class="w-16 h-16 bg-orange-500 rounded-full ani-twinkle"></div>
                    <div class="token-name text-white/70">ani-twinkle</div>
                </div>
                <div class="bg-slate-900 p-12 rounded-2xl flex flex-col items-center justify-center gap-4 relative overflow-hidden h-48 text-white">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 ani-nebula"></div>
                    <div class="relative token-name text-white/70">ani-nebula</div>
                </div>
                <div class="bg-slate-900 p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-white">
                    <div class="w-4 h-4 bg-white rounded-full ani-orbit"></div>
                    <div class="token-name text-white/70">ani-orbit</div>
                </div>
                <div class="bg-slate-900 p-12 rounded-2xl flex flex-col items-center justify-center gap-4 text-white">
                    <svg width="60" height="60" viewBox="0 0 100 100" class="text-starlight">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="4" fill="none" class="ani-svg-draw" />
                    </svg>
                    <div class="token-name text-white/70">ani-svg-draw</div>
                </div>
            </div>
        </section>

        <!-- Components Section -->
        <section>
            <h2>Component Utilities</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">`;

    Object.keys(utilityMaps).forEach(cls => {
      if (cls.startsWith('btn-') || cls.startsWith('input-') || cls === 'glass' || cls === 'bg-starlight' || cls.includes('gradient')) {
        html += `
                <div class="p-6 border border-slate-100 rounded-xl" style="background: var(--card-bg); border-color: var(--border);">
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

        <footer class="mt-20 pt-8 border-t border-slate-200 text-slate-400 text-sm" style="border-color: var(--border);">
            Generated by Quantum CSS Dynamic Docs · ${new Date().toLocaleDateString()}
        </footer>
    </div>
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
      console.log(`📖 Open your browser to see the QuantumCSS demo`);
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
