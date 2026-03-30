#!/usr/bin/env node
const { generateCSS } = require('./generator');
const { defaultTheme, utilityMaps } = require('./defaults');
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
  manifest [output]   Generate an AI-optimized design system catalog

Options:
  -w, --watch         Same as the 'watch' command
  -v, --version       Show version
  -h, --help          Show this help
`);
}

function manifest(outputPath) {
  console.log('📖 Generating AI Design System Manifest...');
  
  let userConfig = {};
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      userConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    } catch (e) {
      console.warn('⚠️  Could not parse quantum.config.json, using defaults only.');
    }
  }

  const manifestData = {
    version: pkg.version,
    theme: {
      colors: { ...defaultTheme.colors, ...(userConfig.theme?.extend?.colors || {}) },
      spacing: { ...defaultTheme.spacing, ...(userConfig.theme?.extend?.spacing || {}) },
      borderRadius: defaultTheme.borderRadius,
      fontSize: defaultTheme.fontSize,
      fontWeight: defaultTheme.fontWeight,
      shadows: defaultTheme.shadows,
      maxWidth: defaultTheme.maxWidth,
      duration: defaultTheme.duration,
      easing: defaultTheme.easing,
      transition: defaultTheme.transition,
      semantic: defaultTheme.semantic,
      light: defaultTheme.light
    },
    utilityMaps: Object.keys(utilityMaps),
    componentPresets: {
      ...utilityMaps,
      ...(userConfig.componentPresets || {})
    },
    plugins: userConfig.plugins || [],
    presets: userConfig.presets || [],
    darkMode: userConfig.darkMode || 'media',
    instructions: "Use ':' for variants (e.g., md:flex). Use Attribute Mode with sm='...' md='...' attributes."
  };

  const json = JSON.stringify(manifestData, null, 2);
  if (outputPath) {
    fs.writeFileSync(outputPath, json);
    console.log(`✅ Manifest saved to ${outputPath}`);
  } else {
    console.log(json);
  }
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
          primary: {
            50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa",
            500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a"
          },
          secondary: {
            50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8",
            500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a"
          },
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          neutral: "#6b7280",
          starlight: {
            blue: "#00d4ff",
            peach: "#ffb38a",
            orange: "#ff7e5f",
            deep: "#08081a"
          }
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
          serif: ["Georgia", "Cambria", "serif"],
          mono: ["SF Mono", "Monaco", "Cascadia Code", "monospace"]
        },
        spacing: {
          px: "1px",
          0: "0px",
          1: "0.25rem",
          2: "0.5rem",
          3: "0.75rem",
          4: "1rem",
          5: "1.25rem",
          6: "1.5rem",
          8: "2rem",
          10: "2.5rem",
          12: "3rem",
          16: "4rem",
          24: "6rem",
          32: "8rem"
        },
        borderRadius: {
          none: "0px",
          sm: "0.125rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
          full: "9999px"
        },
        boxShadow: {
          sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)"
        },
        animation: {
          spin: "spin 1s linear infinite",
          ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
          pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          bounce: "bounce 1s infinite",
          "fade-in": "fadeIn 0.5s ease-in-out",
          "slide-up": "slideUp 0.3s ease-out",
          "slide-down": "slideDown 0.3s ease-out"
        }
      }
    },
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
      "./examples/**/*.html",
      "./index.html"
    ],
    plugins: [
      "container-queries",
      "logical-properties",
      "component-utilities",
      "dark-mode",
      "accessibility"
    ],
    presets: [
      "modern-css"
    ],
    componentPresets: {
      "btn-primary": "btn-starlight px-6 py-2 shadow-md hover:scale-105 active:scale-95",
      "btn-secondary": "btn-base theme-glass px-6 py-2 shadow-md hover:bg-white_10 active:scale-95",
      "card-premium": "card-base theme-glass p-8 shadow-xl",
      "search": "search-container theme-glass-dark rounded-xl",
      "dashboard": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
      "gallery": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
      "form": "card-base theme-glass-dark grid grid-cols-1 md:grid-cols-2 gap-8 items-start",
      "dialog": "dialog-base modal-fixed theme-glass-dark dialog-bg ani-scale-in"
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
    gaming: 'gaming-portal.html',
    blog: 'blog.html',
    travel: 'travel.html',
    shopping: 'shopping.html',
    starlight: 'starlight.html',
    news: 'news.html',
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
    
    case 'manifest':
      manifest(args[1]);
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
