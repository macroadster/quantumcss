const { generateCSS } = require('./generator');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

function build(outputPath) {
  const configPath = './stellar.config.js';
  console.log('✨ Stellar CSS: Generating styles...');
  try {
    const css = generateCSS(configPath);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, css);
    console.log(`✅ Success! Styles generated at ${outputPath}`);
  } catch (err) {
    console.error('❌ Error generating CSS:', err);
  }
}

function main() {
  const args = process.argv.slice(2);
  const watch = args.includes('--watch') || args.includes('-w');
  const outputPath = args.find(a => !a.startsWith('-')) || 'dist/stellar.css';

  build(outputPath);

  if (watch) {
    console.log(`👀 Watching for changes...`);
    const watcher = chokidar.watch(['index.html', 'src/**/*', 'stellar.config.js'], {
      ignored: '**/.*',
      persistent: true
    });

    watcher.on('change', (path) => {
      console.log(`File ${path} changed, rebuilding...`);
      build(outputPath);
    });
  }
}

main();
