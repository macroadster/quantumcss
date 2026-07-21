#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { generateThemeCSS } = require('./theme');
const pkg = require('../package.json');

const CONFIG_FILE = 'quantum.config.json';

function showHelp() {
  console.log(`
QuantumCSS CLI v${pkg.version}
Static CSS library — theme knobs only (no class tree-shaking).

Usage:
  quantumcss [command] [options]

Commands:
  theme [output]      Emit CSS variable overrides from ${CONFIG_FILE} (default: theme-overlay.css)
  init                Create a theme-only ${CONFIG_FILE}
  scaffold <type>     Copy an example template (gaming, blog, travel, shopping, starlight, news, docs)
  manifest [output]   List static style source files / version for AI agents
  build [output]      Alias for theme (theme overlay only; full library is dist/quantum.min.css)

Options:
  -v, --version       Show version
  -h, --help          Show this help

Product CSS is fully static:
  npm run build       → dist/quantum.min.css (base + icons + components + animations + utilities)
  npm run emit:utils  → refresh src/styles/quantum-utilities.css from the catalog (maintainers)
`);
}

function init() {
  if (fs.existsSync(CONFIG_FILE)) {
    console.warn(`⚠️  ${CONFIG_FILE} already exists. Skipping.`);
    return;
  }

  const defaultConfig = {
    theme: {
      colors: {
        primary: '#3b82f6',
        'starlight-blue': '#00d4ff',
        'starlight-peach': '#ffb38a',
        'starlight-orange': '#ff7e5f',
        'starlight-deep': '#08081a',
      },
      glass: { blur: '16px' },
      spacingScale: 1,
    },
  };

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  console.log(`✅ Created theme-only ${CONFIG_FILE}`);
  console.log('   Override CSS variables via kitchen-sink Theme Designer or this file.');
}

function theme(outputPath = 'theme-overlay.css') {
  console.log('🎨 Emitting theme CSS variables...');
  try {
    const css = generateThemeCSS(CONFIG_FILE);
    const outputDir = path.dirname(path.resolve(outputPath));
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, css);
    console.log(`✅ Theme overlay written to ${outputPath}`);
    console.log('   Load after dist/quantum.min.css to retheme without rebuilding the library.');
    return true;
  } catch (err) {
    console.error('❌ Error emitting theme:', err);
    return false;
  }
}

function manifest(outputPath) {
  const stylesDir = path.resolve(__dirname, 'styles');
  const files = fs.existsSync(stylesDir)
    ? fs.readdirSync(stylesDir).filter((f) => f.endsWith('.css'))
    : [];
  const data = {
    version: pkg.version,
    architecture: 'static-first',
    layers: ['base', 'icons', 'components', 'animations', 'utilities'],
    sources: files,
    product: 'dist/quantum.min.css',
    theming: {
      tokens: 'src/styles/quantum-base.css :root --q-*',
      overlay: 'quantumcss theme',
      kitchenSink: 'examples/kitchen-sink.html Theme Designer knobs',
    },
    instructions:
      'Use semantic component classes first. Atomic utilities are a finite static catalog in quantum-utilities.css. Theme via CSS variables (--q-*), not class scanning.',
  };
  const json = JSON.stringify(data, null, 2);
  if (outputPath) {
    fs.writeFileSync(outputPath, json);
    console.log(`✅ Manifest saved to ${outputPath}`);
  } else {
    console.log(json);
  }
}

function scaffold(template, targetPath = 'index.html') {
  const templatesDir = path.resolve(__dirname, '../examples');
  const templateMap = {
    gaming: 'gaming-portal.html',
    blog: 'blog.html',
    travel: 'travel.html',
    shopping: 'shopping.html',
    starlight: 'starlight.html',
    news: 'news.html',
    docs: 'kitchen-sink.html',
  };

  const templateFile = templateMap[template];
  if (!templateFile) {
    console.error(`❌ Unknown template '${template}'. Available: ${Object.keys(templateMap).join(', ')}`);
    process.exit(1);
  }

  const srcPath = path.join(templatesDir, templateFile);
  if (!fs.existsSync(srcPath)) {
    console.error(`❌ Template file not found at ${srcPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(CONFIG_FILE)) init();

  let content = fs.readFileSync(srcPath, 'utf8');
  content = content.replace(/href="(\.\.\/)*dist\/quantum(\.min)?\.css"/, 'href="dist/quantum.min.css"');

  const fullTargetPath = path.resolve(targetPath);
  const targetDir = path.dirname(fullTargetPath);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  fs.writeFileSync(fullTargetPath, content);
  console.log(`🚀 Scaffolded '${template}' → ${targetPath}`);
  console.log('👉 Link dist/quantum.min.css (no JIT build required).');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (args.includes('--help') || args.includes('-h') || !command) {
    showHelp();
    return;
  }
  if (args.includes('--version') || args.includes('-v')) {
    console.log(pkg.version);
    return;
  }

  switch (command) {
    case 'init':
      init();
      break;
    case 'theme':
    case 'build':
      theme(args[1]);
      break;
    case 'manifest':
      manifest(args[1]);
      break;
    case 'scaffold':
      if (!args[1]) {
        console.error('❌ scaffold requires a template name');
        process.exit(1);
      }
      scaffold(args[1], args[2]);
      break;
    default:
      // bare path → theme output
      if (command.endsWith('.css')) theme(command);
      else {
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
      }
  }
}

main();
