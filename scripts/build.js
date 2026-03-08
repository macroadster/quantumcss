const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { generateCSS } = require('../src/generator');
const { runConfiguredTransforms } = require('../src/semantic/transformer');
const { processTemplate } = require('./semantic-strip');

class QuantumCSSBuilder {
  constructor(config = {}) {
    this.config = {
      inputDir: path.resolve(__dirname, '../src/styles'),
      outputFile: path.resolve(__dirname, '../dist/quantum.min.css'),
      configPath: path.resolve(__dirname, '../quantum.config.json'),
      minify: false,
      semantic: false,
      watch: false,
      analyze: false,
      ...config
    };
    
    this.cssFiles = [
      'quantum-base.css',
      'quantum-components.css',
      'quantum-animations.css',
      'starlight.css'
    ];
  }

  async processCSS(css) {
    console.log('🔧 Processing CSS with PostCSS...');
    const result = await postcss([
      autoprefixer,
      cssnano({
        preset: ['default', {
          discardDuplicates: true,
          mergeRules: true,
          reduceIdents: false,
          zindex: false
        }]
      })
    ]).process(css, { from: undefined });
    
    return result.css;
  }

  async buildCSS() {
    console.log('\n🚀 Building QuantumCSS...');
    
    let combinedCSS = '/*!\n' +
      ' * QuantumCSS + Starlight UI v1.10.1 - Advanced Utility-First CSS Framework\n' +
      ' * License: MIT\n' +
      ' */\n\n';

    for (const file of this.cssFiles) {
      const filePath = path.join(this.config.inputDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        combinedCSS += `\n/* --- ${file} --- */\n` + content + '\n';
        console.log(`✓ Loaded static ${file} (${(content.length / 1024).toFixed(2)} KB)`);
      }
    }

    console.log('✨ Running JIT Generator...');
    const jitCSS = generateCSS(this.config.configPath);
    combinedCSS += '\n/* --- JIT Utilities --- */\n' + jitCSS;
    console.log(`✓ JIT Utilities generated`);

    if (this.config.minify) {
      combinedCSS = await this.processCSS(combinedCSS);
    }

    const distDir = path.dirname(this.config.outputFile);
    if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

    fs.writeFileSync(this.config.outputFile, combinedCSS);
    
    const stats = fs.statSync(this.config.outputFile);
    const gzipped = zlib.gzipSync(combinedCSS);
    
    console.log(`✨ Build complete!`);
    console.log(`📁 Output: ${this.config.outputFile}`);
    console.log(`📊 Final Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`📦 Gzipped Size: ${(gzipped.length / 1024).toFixed(2)} KB\n`);
  }

  runSemanticStrip() {
    const configPath = path.resolve(this.config.configPath);
    if (!fs.existsSync(configPath)) return [];
    delete require.cache[configPath];
    const fileConfig = require(configPath);
    
    const semanticStripConfig = fileConfig.semanticStrip;
    if (!semanticStripConfig || !Array.isArray(semanticStripConfig.templates)) {
      return [];
    }

    const baseDir = path.dirname(configPath);
    const results = [];

    for (const template of semanticStripConfig.templates) {
      const inputPath = path.resolve(baseDir, template.input);
      const outputDir = path.resolve(baseDir, template.output);
      
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠ Template not found: ${inputPath}`);
        continue;
      }

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const result = processTemplate(inputPath, outputDir);
      console.log(`🎯 Semantic strip: ${template.input} -> ${template.output}`);
      results.push(result);
    }

    return results;
  }

  runSemanticTransforms() {
    const configPath = path.resolve(this.config.configPath);
    if (!fs.existsSync(configPath)) return [];
    delete require.cache[configPath];
    const fileConfig = require(configPath);
    if (!this.config.semantic && !Array.isArray(fileConfig.semanticTemplates)) {
      return [];
    }

    const results = runConfiguredTransforms(fileConfig, path.dirname(configPath));
    for (const result of results) {
      console.log(`🧭 Semantic template (${result.template})`);
      console.log(`   HTML: ${result.htmlOutput}`);
      console.log(`   CSS:  ${result.cssOutput}`);
    }
    return results;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const config = {
    minify: args.includes('--minify'),
    semantic: args.includes('--semantic')
  };
  
  const builder = new QuantumCSSBuilder(config);
  await builder.buildCSS();
  builder.runSemanticTransforms();
  
  if (config.semantic) {
    builder.runSemanticStrip();
  }
}

if (require.main === module) {
  main();
}

module.exports = { QuantumCSSBuilder };
