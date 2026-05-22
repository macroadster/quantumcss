const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { generateCSS } = require('../src/generator');
const pkg = require('../package.json');

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
      { file: 'quantum-base.css', layer: 'base' },
      { file: 'quantum-icons.css', layer: 'icons' },
      { file: 'quantum-components.css', layer: 'components' },
      { file: 'quantum-animations.css', layer: 'animations' }
    ];
  }

  async processCSS(css) {
    console.log('🔧 Processing CSS with PostCSS...');
    const plugins = [autoprefixer];

    if (this.config.minify) {
      plugins.push(cssnano({
        preset: ['default', {
          discardDuplicates: true,
          mergeRules: true,
          reduceIdents: false,
          zindex: false
        }]
      }));
    }

    const mapOutputPath = this.config.outputFile + '.map';
    const result = await postcss(plugins).process(css, {
      from: 'src/styles/quantum-combined.css',
      to: this.config.outputFile,
      map: { inline: false }
    });

    fs.writeFileSync(mapOutputPath, result.map.toString());
    console.log(`🗺️  Source map: ${mapOutputPath}`);
    
    return result.css;
  }

  async buildCSS() {
    console.log('\n🚀 Building QuantumCSS...');
    
    let combinedCSS = '/*!\n' +
      ` * QuantumCSS + Starlight UI v${pkg.version} - Beautiful UI by Default\n` +
      ' * License: MIT\n' +
      ' */\n\n';

    // Declare layer order up front for cascade control
    combinedCSS += '@layer base, icons, components, animations, utilities;\n\n';

    for (const { file, layer } of this.cssFiles) {
      const filePath = path.join(this.config.inputDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        combinedCSS += `\n/* --- ${file} --- */\n@layer ${layer} {\n` + content + '\n}\n';
        console.log(`✓ Loaded static ${file} (${(content.length / 1024).toFixed(2)} KB)`);
      }
    }

    console.log('✨ Running JIT Generator...');
    const jitCSS = generateCSS(this.config.configPath);
    combinedCSS += '\n/* --- JIT Utilities --- */\n@layer utilities {\n' + jitCSS + '\n}\n';
    console.log(`✓ JIT Utilities generated`);

    combinedCSS = await this.processCSS(combinedCSS);

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
}

async function main() {
  const args = process.argv.slice(2);
  const config = {
    minify: args.includes('--minify'),
    watch: args.includes('--watch')
  };
  
  const builder = new QuantumCSSBuilder(config);
  await builder.buildCSS();

  if (config.watch) {
    const chokidar = require('chokidar');
    const watchPaths = [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../quantum.config.json')
    ];
    console.log('👀 Watching for changes...');
    const watcher = chokidar.watch(watchPaths, { ignoreInitial: true });
    let building = false;
    const rebuild = async () => {
      if (building) return;
      building = true;
      try { await builder.buildCSS(); }
      catch (err) { console.error('Build error:', err.message); }
      building = false;
    };
    watcher.on('change', rebuild).on('add', rebuild).on('unlink', rebuild);
  }
}

if (require.main === module) {
  main();
}

module.exports = { QuantumCSSBuilder };
