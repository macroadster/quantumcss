#!/usr/bin/env node
/**
 * Consumer smoke: npm pack → extract → verify tarball surface and theme API.
 * Does not publish. Fails if examples/ or build-only deps leak into the pack.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'qcss-pack-'));

function fail(msg) {
  console.error(`❌ pack-smoke: ${msg}`);
  process.exit(1);
}

try {
  const packOut = execSync('npm pack --json', { cwd: root, encoding: 'utf8' });
  const [{ filename }] = JSON.parse(packOut);
  const tarball = path.join(root, filename);
  if (!fs.existsSync(tarball)) fail(`missing tarball ${filename}`);

  execSync(`tar -xzf "${tarball}" -C "${tmp}"`, { stdio: 'pipe' });
  const pkgDir = path.join(tmp, 'package');
  const packed = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));

  if (packed.dependencies && Object.keys(packed.dependencies).length) {
    fail(`production dependencies should be empty, got ${JSON.stringify(packed.dependencies)}`);
  }
  if (!packed.style || !packed.exports || !packed.exports['.']) {
    fail('missing style / exports map');
  }
  for (const rel of ['dist/quantum.min.css', 'src/cli.js', 'src/theme.js', 'src/starlight.js']) {
    if (!fs.existsSync(path.join(pkgDir, rel))) fail(`pack missing ${rel}`);
  }
  if (fs.existsSync(path.join(pkgDir, 'examples'))) fail('examples/ should not be in the npm pack');
  if (fs.existsSync(path.join(pkgDir, 'src/generator.js'))) {
    fail('legacy generator.js should not ship in the npm pack');
  }

  const { generateThemeCSS } = require(path.join(pkgDir, 'src/theme.js'));
  const css = generateThemeCSS(path.join(root, 'quantum.config.json'));
  if (!css.includes(':root') || !css.includes('--q-')) {
    fail('theme overlay did not emit CSS variables');
  }

  fs.unlinkSync(tarball);
  console.log('✅ pack-smoke passed');
  console.log(`   tarball surface ok; theme overlay emits variables; no examples/generator leak`);
} catch (err) {
  fail(err.message || String(err));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
  // clean any leftover tarball in root
  for (const f of fs.readdirSync(root)) {
    if (f.endsWith('.tgz') && f.startsWith('howssatoshi-quantumcss-')) {
      try { fs.unlinkSync(path.join(root, f)); } catch (_) {}
    }
  }
}
