const fs = require('fs');
const path = require('path');

class ApexTester {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  assert(condition, message) {
    if (condition) {
      this.passed++;
      console.log(`✅ ${message}`);
    } else {
      this.failed++;
      console.log(`❌ ${message}`);
    }
  }

  testCSSFileExists() {
    console.log('\n🧪 Testing CSS Files...');
    const files = [
      'apex-base.css',
      'apex-utilities.css',
      'apex-responsive.css',
      'apex-components.css'
    ];

    files.forEach(file => {
      this.assert(
        fs.existsSync(path.join(__dirname, file)),
        `${file} exists`
      );
    });
  }

  testBuiltFiles() {
    console.log('\n🏗️ Testing Built Files...');
    this.assert(
      fs.existsSync(path.join(__dirname, 'dist', 'apex.css')),
      'Built apex.css exists'
    );
    this.assert(
      fs.existsSync(path.join(__dirname, 'dist', 'apex.min.css')),
      'Built apex.min.css exists'
    );
    this.assert(
      fs.existsSync(path.join(__dirname, 'dist', 'analysis.json')),
      'Analysis report exists'
    );
  }

  testCSSContent() {
    console.log('\n📝 Testing CSS Content...');
    try {
      const css = fs.readFileSync(path.join(__dirname, 'dist', 'apex.css'), 'utf8');
      
      this.assert(css.includes('@layer'), 'Uses CSS cascade layers');
      this.assert(css.includes('--color-'), 'Includes CSS custom properties');
      this.assert(css.includes('.btn'), 'Includes button components');
      this.assert(css.includes('.card'), 'Includes card components');
      this.assert(css.includes('.input'), 'Includes input components');
      this.assert(css.includes('grid-cols-'), 'Includes grid utilities');
      this.assert(css.includes('text-'), 'Includes typography utilities');
      this.assert(css.includes('bg-'), 'Includes background utilities');
      this.assert(css.includes('hover:'), 'Includes hover states');
      this.assert(css.includes('sm\\:'), 'Includes responsive breakpoints');
      
    } catch (error) {
      this.assert(false, `Could not read CSS file: ${error.message}`);
    }
  }

  testBundleSize() {
    console.log('\n📦 Testing Bundle Size...');
    try {
      const cssPath = path.join(__dirname, 'dist', 'apex.min.css');
      const stats = fs.statSync(cssPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      
      this.assert(
        stats.size < 50000, // Less than 50KB
        `Minified bundle size is ${sizeKB}KB (target: <50KB)`
      );
      
    } catch (error) {
      this.assert(false, `Could not check bundle size: ${error.message}`);
    }
  }

  testConfiguration() {
    console.log('\n⚙️ Testing Configuration...');
    try {
      const configPath = path.join(__dirname, 'apex.config.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      this.assert(config.theme !== undefined, 'Has theme configuration');
      this.assert(config.content !== undefined, 'Has content configuration');
      this.assert(config.darkMode === 'class', 'Has dark mode configuration');
      this.assert(Array.isArray(config.plugins), 'Has plugins array');
      
    } catch (error) {
      this.assert(false, `Could not read configuration: ${error.message}`);
    }
  }

  testBuildSystem() {
    console.log('\n🔧 Testing Build System...');
    try {
      const buildScript = fs.readFileSync(path.join(__dirname, 'apex-build.js'), 'utf8');
      
      this.assert(buildScript.includes('class ApexBuilder'), 'Has ApexBuilder class');
      this.assert(buildScript.includes('minifyCSS'), 'Has CSS minification');
      this.assert(buildScript.includes('generateAnalysis'), 'Has analysis generation');
      
    } catch (error) {
      this.assert(false, `Could not test build system: ${error.message}`);
    }
  }

  testPackageInfo() {
    console.log('\n📋 Testing Package Information...');
    try {
      const packagePath = path.join(__dirname, 'apex-package.json');
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      this.assert(pkg.name === 'apex-css', 'Correct package name');
      this.assert(pkg.version === '2.0.0', 'Correct version');
      this.assert(pkg.description.includes('utility-first'), 'Relevant description');
      this.assert(Array.isArray(pkg.keywords), 'Has keywords array');
      this.assert(pkg.license === 'MIT', 'MIT license');
      
    } catch (error) {
      this.assert(false, `Could not test package info: ${error.message}`);
    }
  }

  testDemoHTML() {
    console.log('\n🎨 Testing Demo HTML...');
    try {
      const demoPath = path.join(__dirname, 'demo.html');
      const demo = fs.readFileSync(demoPath, 'utf8');
      
      this.assert(demo.includes('Apex CSS'), 'Contains Apex CSS branding');
      this.assert(demo.includes('btn'), 'Includes button demos');
      this.assert(demo.includes('card'), 'Includes card demos');
      this.assert(demo.includes('Chart.js'), 'Includes performance chart');
      this.assert(demo.includes('interactive'), 'Includes interactive elements');
      
    } catch (error) {
      this.assert(false, `Could not test demo HTML: ${error.message}`);
    }
  }

  runAllTests() {
    console.log('🚀 Running Apex CSS Tests...\n');
    
    this.testCSSFileExists();
    this.testBuiltFiles();
    this.testCSSContent();
    this.testBundleSize();
    this.testConfiguration();
    this.testBuildSystem();
    this.testPackageInfo();
    this.testDemoHTML();
    
    this.printResults();
  }

  printResults() {
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${this.passed}`);
    console.log(`❌ Failed: ${this.failed}`);
    console.log(`📈 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
    
    if (this.failed === 0) {
      console.log('\n🎉 All tests passed! Apex CSS is ready for deployment.');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the issues above.');
    }
  }
}

// Run tests
if (require.main === module) {
  const tester = new ApexTester();
  tester.runAllTests();
}

module.exports = ApexTester;