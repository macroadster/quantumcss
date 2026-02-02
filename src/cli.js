#!/usr/bin/env node
const { generateCSS } = require('./generator');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

function build(outputPath) {
  const configPath = './quantum.config.json';
  console.log('✨ Quantum CSS: Generating styles...');
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

function scaffold(template, targetPath) {
  const templatesDir = path.resolve(__dirname, '../examples');
  const templateMap = {
    gaming: 'gaming-template.html',
    blog: 'blog-template.html',
    travel: 'travel/index.html',
    shopping: 'shopping/index.html',
    starlight: 'starlight.html',
    news: 'news-template.html',
    docs: 'kitchen-sink.html'
  };

  const templateFile = templateMap[template];
  if (!templateFile) {
    console.error(`❌ Error: Unknown template '${template}'. Available: ${Object.keys(templateMap).join(', ')}`);
    process.exit(1);
  }

  const srcPath = path.join(templatesDir, templateFile);
  if (!fs.existsSync(srcPath)) {
    console.error(`❌ Error: Template file not found at ${srcPath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(srcPath, 'utf8');
  
  // Adjust stylesheet path in template
  content = content.replace(/href="(\.\.\/)*dist\/quantum(\.min)?\.css"/, 'href="dist/quantum.css"');

  const fullTargetPath = path.resolve(targetPath);
  const targetDir = path.dirname(fullTargetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(fullTargetPath, content);
  console.log(`🚀 Successfully scaffolded '${template}' template to ${targetPath}`);
  console.log(`👉 Run 'quantumcss' to generate the required CSS.`);
}

function main() {
  const args = process.argv.slice(2);

  if (args[0] === 'scaffold') {
    const template = args[1];
    const targetPath = args[2] || 'index.html';
    if (!template) {
      console.error('❌ Error: Please specify a template name (e.g., gaming, blog, travel)');
      process.exit(1);
    }
    scaffold(template, targetPath);
    return;
  }

  const watch = args.includes('--watch') || args.includes('-w');
  const outputPath = args.find(a => !a.startsWith('-')) || 'dist/quantum.css';

  build(outputPath);

  if (watch) {
    console.log(`👀 Watching for changes...`);
    const watcher = chokidar.watch(['index.html', 'src/**/*', 'quantum.config.json'], {
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
