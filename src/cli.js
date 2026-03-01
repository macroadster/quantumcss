#!/usr/bin/env node
const { generateCSS } = require('./generator');
const { defaultTheme } = require('./defaults');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const pkg = require('../package.json');

const CONFIG_FILE = 'quantum.config.json';

function showHelp() {
  console.log(`
QuantumCSS CLI v${pkg.version}
Usage:
  quantumcss [command] [options]

Commands:
  build [output]      Build the JIT CSS (default command)
  watch [output]      Build and watch for changes
  init                Generate a default ${CONFIG_FILE}
  scaffold <type>     Generate a template (gaming, blog, travel, etc.)

Options:
  -w, --watch         Same as the 'watch' command
  -v, --version       Show version
  -h, --help          Show this help
`);
}

function init() {
  if (fs.existsSync(CONFIG_FILE)) {
    console.warn(`⚠️  ${CONFIG_FILE} already exists. Skipping.`);
    return;
  }

  const defaultConfig = {
    theme: {
      extend: {
        colors: {
          primary: defaultTheme.colors.blue[500],
          secondary: defaultTheme.colors.slate[600],
          starlight: defaultTheme.colors.starlight
        }
      }
    },
    content: ["./**/*.html"],
    componentPresets: {
      "btn-action": "btn-base theme-starlight px-8 py-3 focus-glow",
      "card-premium": "card-base theme-glass-dark p-10 shadow-2xl"
    },
    darkMode: "media"
  };

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  console.log(`✅ Created ${CONFIG_FILE} with default settings.`);
}

function build(outputPath = 'dist/quantum.css') {
  console.log('✨ Quantum CSS: Generating styles...');
  try {
    const css = generateCSS(CONFIG_FILE);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, css);
    console.log(`✅ Success! Styles generated at ${outputPath}`);
    return true;
  } catch (err) {
    console.error('❌ Error generating CSS:', err);
    return false;
  }
}

function scaffold(template, targetPath = 'index.html') {
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

  // Ensure config exists for the new user
  if (!fs.existsSync(CONFIG_FILE)) {
    init();
  }

  let content = fs.readFileSync(srcPath, 'utf8');
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
  const command = args[0];

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`v${pkg.version}`);
    return;
  }

  switch (command) {
    case 'init':
      init();
      break;
    
    case 'scaffold':
      if (!args[1]) {
        console.error('❌ Error: Please specify a template name (e.g., gaming, blog, travel)');
        process.exit(1);
      }
      scaffold(args[1], args[2]);
      break;

    case 'watch': {
      const out = args[1] || 'dist/quantum.css';
      build(out);
      console.log(`👀 Watching for changes...`);
      
      // Load content globs from config if possible
      let watchPaths = ['./**/*.html', CONFIG_FILE];
      if (fs.existsSync(CONFIG_FILE)) {
        try {
          const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
          if (config.content) watchPaths = [...config.content, CONFIG_FILE];
        } catch (e) {}
      }

      const watcher = chokidar.watch(watchPaths, { ignored: '**/node_modules/**', persistent: true });
      watcher.on('change', (p) => {
        console.log(`File ${p} changed, rebuilding...`);
        build(out);
      });
      break;
    }

    case 'build':
      build(args[1]);
      break;

    default:
      if (args.includes('--watch') || args.includes('-w')) {
        // Handle shorthand watch
        const out = args.find(a => !a.startsWith('-')) || 'dist/quantum.css';
        build(out);
        console.log(`👀 Watching for changes...`);
        chokidar.watch(['./**/*.html', CONFIG_FILE], { ignored: '**/node_modules/**' }).on('change', () => build(out));
      } else {
        // Default to build
        build(command);
      }
  }
}

main();
