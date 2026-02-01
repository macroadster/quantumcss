const fs = require('fs');
const path = require('path');

class QuantumCSSBuilder {
  constructor(config = {}) {
    this.config = {
      inputDir: path.resolve(__dirname, '../src/styles'),
      outputFile: path.resolve(__dirname, '../dist/quantum.min.css'),
      minify: false,
      watch: false,
      analyze: false,
      ...config
    };
    
    this.cssFiles = [
      'quantum.css',
      'quantum-responsive.css', 
      'quantum-components.css',
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
    
    for (const file of this.cssFiles) {
      const filePath = path.join(this.config.inputDir, file);
      
      if (fs.existsSync(filePath)) {
        const css = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);
        
        combinedCSS += css + '\n';
        totalSize += stats.size;
        
        console.log(`✓ Loaded ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
      } else {
        console.warn(`⚠️  File not found: ${filePath}`);
      }
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
    console.log(`📊 Size: ${(outputStats.size / 1024).toFixed(2)} KB (${compressionRatio}% reduction)`);
    
    // Analyze if requested
    if (this.config.analyze) {
      this.analyzeCSS(combinedCSS);
    }
    
    return combinedCSS;
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
    
    this.cssFiles.forEach(file => {
      const filePath = path.join(this.config.inputDir, file);
      
      if (fs.existsSync(filePath)) {
        fs.watchFile(filePath, () => {
          console.log(`📝 Changes detected in ${file}. Rebuilding...`);
          this.buildCSS();
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
    analyze: false
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
      case '--dev':
      case '-d':
        config.watch = true;
        config.minify = false;
        break;
    }
  });
  
  const builder = new QuantumCSSBuilder(config);
  
  if (config.watch && args.includes('--dev')) {
    builder.buildCSS().then(() => {
      builder.watch();
      builder.startDevServer();
    });
  } else if (config.watch) {
    builder.buildCSS().then(() => {
      builder.watch();
    });
  } else {
    builder.buildCSS();
  }
}

// Export for use as module
module.exports = { QuantumCSSBuilder };

// Run if called directly
if (require.main === module) {
  main();
}