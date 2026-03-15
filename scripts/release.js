const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function readPackageJson() {
  const pkgPath = path.join(rootDir, 'package.json');
  const content = fs.readFileSync(pkgPath, 'utf8');
  return JSON.parse(content);
}

function updateReadmeBadge(version) {
  const readmePath = path.join(rootDir, 'README.md');
  let content = fs.readFileSync(readmePath, 'utf8');
  
  const oldBadge = /!\[Quantum CSS\]\(https:\/\/img\.shields\.io\/badge\/Quantum%20CSS-v[\d.]+-blue\)/;
  const newBadge = `![Quantum CSS](https://img.shields.io/badge/Quantum%20CSS-v${version}-blue)`;
  
  content = content.replace(oldBadge, newBadge);
  
  fs.writeFileSync(readmePath, content);
  console.log(`✓ Updated README.md badge to v${version}`);
}

function updateBuildJsBanner(version) {
  const buildPath = path.join(rootDir, 'scripts', 'build.js');
  let content = fs.readFileSync(buildPath, 'utf8');
  
  const oldBanner = /\* QuantumCSS \+ Starlight UI v[\d.]+ - Advanced/;
  const newBanner = `* QuantumCSS + Starlight UI v${version} - Advanced`;
  
  content = content.replace(oldBanner, newBanner);
  
  fs.writeFileSync(buildPath, content);
  console.log(`✓ Updated build.js banner to v${version}`);
}

function updatePortfolioTimeline(version) {
  const portfolioPath = path.join(rootDir, 'examples', 'portfolio.html');
  let content = fs.readFileSync(portfolioPath, 'utf8');
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  
  const newEntry = `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-date">${month} ${year}</span>
                        <h3 class="text-xl font-bold mb-2">v${version}: Release</h3>
                        <p class="text-sm text-muted">New features and improvements.</p>
                    </div>
                </div>`;
  
  const timelineStart = /<div class="starlight-timeline">/;
  content = content.replace(timelineStart, `<div class="starlight-timeline">${newEntry}`);
  
  fs.writeFileSync(portfolioPath, content);
  console.log(`✓ Added v${version} entry to portfolio.html timeline`);
}

function release() {
  console.log('🚀 Running QuantumCSS Release...\n');
  
  const pkg = readPackageJson();
  const version = pkg.version;
  
  console.log(`📦 Releasing version ${version}\n`);
  
  updateReadmeBadge(version);
  updateBuildJsBanner(version);
  updatePortfolioTimeline(version);
  
  console.log(`\n✅ Release v${version} complete!`);
}

release();
