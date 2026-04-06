const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

function readPackageJson() {
  const pkgPath = path.join(rootDir, 'package.json');
  const content = fs.readFileSync(pkgPath, 'utf8');
  return JSON.parse(content);
}

function getChangelog(currentVersion) {
  try {
    const tags = execSync('git tag --list "v*" --sort=-v:refname', { cwd: rootDir, encoding: 'utf8' });
    const tagList = tags.trim().split('\n').filter(Boolean);
    
    if (tagList.length < 2) return null;
    
    const currentTag = `v${currentVersion}`;
    const previousTag = tagList[1];
    
    const log = execSync(`git log ${previousTag}..${currentTag} --oneline`, { cwd: rootDir, encoding: 'utf8' });
    const commits = log.trim().split('\n').filter(Boolean);
    
    if (commits.length === 0) return null;
    
    const formattedCommits = commits.map(commit => {
      const match = commit.match(/^([a-f0-9]+)\s+(.+)$/);
      if (!match) return null;
      
      let message = match[2];
      const typeMatch = message.match(/^(\w+):\s*(.+)$/);
      if (typeMatch) {
        const type = typeMatch[1].toLowerCase();
        message = typeMatch[2];
        if (['feat', 'fix', 'docs', 'build', 'refactor', 'perf'].includes(type)) {
          message = `${type}: ${message}`;
        }
      }
      
      if (message.length > 80) {
        message = message.slice(0, 77) + '...';
      }
      
      return message;
    }).filter(Boolean);
    
    if (formattedCommits.length === 0) return null;
    
    return formattedCommits.join(', ');
  } catch (e) {
    return null;
  }
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
  
  const changelog = getChangelog(version);
  const description = changelog 
    ? `<p class="opacity-70 text-sm">${changelog}</p>`
    : `<p class="opacity-70 text-sm">New features and improvements.</p>`;
  
  const newEntry = `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-date">${month} ${year}</span>
                        <h3 class="text-xl font-bold mb-2">v${version}: Release</h3>
                        ${description}
                    </div>
                </div>`;
  
  const timelineStart = /<div class="starlight-timeline">/;
  content = content.replace(timelineStart, `<div class="starlight-timeline">${newEntry}`);
  
  fs.writeFileSync(portfolioPath, content);
  console.log(`✓ Added v${version} entry to portfolio.html timeline`);
}

function updateIndexVersion(version) {
  const indexPath = path.join(rootDir, 'examples', 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  const oldVersion = /QuantumCSS v[\d.]+/;
  const newVersion = `QuantumCSS v${version}`;
  
  content = content.replace(oldVersion, newVersion);
  
  fs.writeFileSync(indexPath, content);
  console.log(`✓ Updated examples/index.html version to v${version}`);
}

function release() {
  console.log('🚀 Running QuantumCSS Release...\n');
  
  const pkg = readPackageJson();
  const version = pkg.version;
  
  console.log(`📦 Releasing version ${version}\n`);
  
  updateReadmeBadge(version);
  updateBuildJsBanner(version);
  updatePortfolioTimeline(version);
  updateIndexVersion(version);
  
  console.log(`\n✅ Release v${version} complete!`);
}

release();
