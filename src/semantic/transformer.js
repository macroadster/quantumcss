const fs = require('fs');
const path = require('path');
const parse5 = require('parse5');

const structuralClasses = new Set([
  'email-layout',
  'email-sidebar',
  'email-main',
  'email-list',
  'email-content',
  'compose-btn',
  'nav-item',
  'nav-badge',
  'nav-section-title',
  'user-profile-section',
  'user-cell',
  'user-info',
  'user-name',
  'user-email',
  'email-item',
  'email-meta',
  'email-sender',
  'email-time',
  'email-subject',
  'email-preview',
  'email-header',
  'email-sender-info',
  'sender-details',
  'email-actions',
  'email-body',
  'folder-item',
  'label',
  'label-work',
  'label-personal',
  'label-important',
  'avatar',
  'avatar-lg',
  'active',
  'unread'
]);

function walk(node, visitor, parent = null) {
  if (!node) return;
  visitor(node, parent);
  for (const child of node.childNodes || []) {
    walk(child, visitor, node);
  }
}

function cloneNode(node) {
  if (!node || typeof node !== 'object') return node;
  const clone = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === 'parentNode') continue;
    if (Array.isArray(value)) {
      clone[key] = value.map((entry) => cloneNode(entry));
      continue;
    }
    if (value && typeof value === 'object') {
      clone[key] = cloneNode(value);
      continue;
    }
    clone[key] = value;
  }
  return clone;
}

function getAttribute(node, name) {
  return (node.attrs || []).find((attr) => attr.name === name)?.value;
}

function setAttribute(node, name, value) {
  node.attrs = node.attrs || [];
  const existing = node.attrs.find((attr) => attr.name === name);
  if (existing) {
    existing.value = value;
    return;
  }
  node.attrs.push({ name, value });
}

function removeAttribute(node, name) {
  if (!node.attrs) return;
  node.attrs = node.attrs.filter((attr) => attr.name !== name);
}

function hasClass(node, className) {
  const value = getAttribute(node, 'class');
  if (!value) return false;
  return value.split(/\s+/).includes(className);
}

function removeStructuralClasses(node) {
  walk(node, (current) => {
    if (!current.tagName) return;
    const classValue = getAttribute(current, 'class');
    if (!classValue) return;
    const filtered = classValue
      .split(/\s+/)
      .filter(Boolean)
      .filter((cls) => !structuralClasses.has(cls));
    if (filtered.length > 0) {
      setAttribute(current, 'class', filtered.join(' '));
    } else {
      removeAttribute(current, 'class');
    }
    removeAttribute(current, 'title');
  });
}

function textContent(node) {
  if (!node) return '';
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map((child) => textContent(child)).join('');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function serialize(node) {
  const fragment = parse5.parseFragment('');
  fragment.childNodes = [node];
  node.parentNode = fragment;
  return parse5.serialize(fragment);
}

function serializeChildren(node) {
  return (node.childNodes || []).map((child) => serialize(child)).join('');
}

function findFirst(node, predicate) {
  let match = null;
  walk(node, (current) => {
    if (!match && predicate(current)) {
      match = current;
    }
  });
  return match;
}

function findAll(node, predicate) {
  const matches = [];
  walk(node, (current) => {
    if (predicate(current)) {
      matches.push(current);
    }
  });
  return matches;
}

function getDocument(source) {
  return parse5.parse(source, { sourceCodeLocationInfo: false });
}

function getHtmlNode(document) {
  return findFirst(document, (node) => node.tagName === 'html');
}

function getHeadNode(document) {
  return findFirst(document, (node) => node.tagName === 'head');
}

function getBodyNode(document) {
  return findFirst(document, (node) => node.tagName === 'body');
}

function getHeadMarkup(document, cssHref) {
  const head = getHeadNode(document);
  const parts = [];
  for (const child of head.childNodes || []) {
    if (child.tagName === 'style') continue;
    parts.push(serialize(child));
  }
  if (cssHref) {
    parts.push(`\n  <link rel="stylesheet" href="${escapeHtml(cssHref)}">`);
  }
  return parts.join('');
}

function getBodyClasses(document) {
  return getAttribute(getBodyNode(document), 'class') || '';
}

function getScriptlessBody(document) {
  const body = cloneNode(getBodyNode(document));
  body.childNodes = (body.childNodes || []).filter((child) => child.tagName !== 'script');
  return body;
}

function findByClass(node, className) {
  return findFirst(node, (current) => current.tagName && hasClass(current, className));
}

function findChildrenByTag(node, tagName) {
  return (node.childNodes || []).filter((child) => child.tagName === tagName);
}

function attrMap(node) {
  return Object.fromEntries((node.attrs || []).map((attr) => [attr.name, attr.value]));
}

function sanitizeFragment(node) {
  const clone = cloneNode(node);
  removeStructuralClasses(clone);
  return serialize(clone);
}

function iconButtonMarkup(node) {
  const clone = cloneNode(node);
  removeStructuralClasses(clone);
  const title = getAttribute(node, 'title');
  removeAttribute(clone, 'title');
  clone.tagName = 'button';
  clone.nodeName = 'button';
  setAttribute(clone, 'aria-label', title || 'Action');
  setAttribute(clone, 'type', 'button');
  return serialize(clone);
}

function getNavButtonMarkup(button) {
  const clone = cloneNode(button);
  setAttribute(clone, 'type', 'button');
  if (hasClass(button, 'active')) {
    setAttribute(clone, 'aria-current', 'page');
  }
  const originalChildren = (button.childNodes || []).filter((child) => child.tagName);
  const cloneChildren = (clone.childNodes || []).filter((child) => child.tagName);
  originalChildren.forEach((child, index) => {
    if (hasClass(child, 'nav-badge') && cloneChildren[index]) {
      cloneChildren[index].tagName = 'em';
      cloneChildren[index].nodeName = 'em';
    }
  });
  removeStructuralClasses(clone);
  removeAttribute(clone, 'style');
  return `<li>${serialize(clone)}</li>`;
}

function getLabelButtonsMarkup(sectionNode) {
  const title = findByClass(sectionNode, 'nav-section-title');
  const nav = findFirst(sectionNode, (node) => node.tagName === 'nav');
  const buttons = findChildrenByTag(nav, 'button');
  const items = buttons.map((button) => {
    const clone = cloneNode(button);
    setAttribute(clone, 'type', 'button');
    removeAttribute(clone, 'style');
    const originalChildren = (button.childNodes || []).filter((child) => child.tagName);
    const cloneChildren = (clone.childNodes || []).filter((child) => child.tagName);
    if (originalChildren[0] && cloneChildren[0] && originalChildren[0].tagName === 'span') {
      cloneChildren[0].tagName = 'b';
      cloneChildren[0].nodeName = 'b';
      const classes = (getAttribute(originalChildren[0], 'class') || '').split(/\s+/);
      const bgClass = classes.find((cls) => cls.startsWith('bg-'));
      if (bgClass) {
        const colorMap = {
          'bg-blue-500': '#3b82f6',
          'bg-green-500': '#22c55e',
          'bg-red-500': '#ef4444'
        };
        setAttribute(cloneChildren[0], 'style', `--c:${colorMap[bgClass] || '#3b82f6'}`);
      }
    }
    removeStructuralClasses(clone);
    return `<li>${serialize(clone)}</li>`;
  }).join('\n');

  return `
    <section>
      <h6>${escapeHtml(textContent(title).trim())}</h6>
      <ul>
${items}
      </ul>
    </section>`;
}

function getUserFooterMarkup(footerNode) {
  const avatar = findByClass(footerNode, 'avatar');
  const name = findByClass(footerNode, 'user-name');
  const email = findByClass(footerNode, 'user-email');
  const themeButton = findFirst(footerNode, (node) => node.tagName === 'button');
  return `
    <footer>
      <figure data-initials="${escapeHtml(textContent(avatar).trim())}"></figure>
      <span>
        <strong>${escapeHtml(textContent(name).trim())}</strong>
        <small>${escapeHtml(textContent(email).trim())}</small>
      </span>
      ${iconButtonMarkup(themeButton)}
    </footer>`;
}

function getSearchMarkup(searchWrapper) {
  const clone = cloneNode(searchWrapper);
  removeStructuralClasses(clone);
  return serialize(clone);
}

function getEmailItemsMarkup(emailListNode) {
  const items = findChildrenByTag(emailListNode, 'div').filter((node) => hasClass(node, 'email-item'));
  return items.map((item) => {
    const meta = findByClass(item, 'email-meta');
    const sender = findByClass(item, 'email-sender');
    const time = findByClass(item, 'email-time');
    const subject = findFirst(item, (node) => node.tagName === 'div' && hasClass(node, 'email-subject'));
    const preview = findByClass(item, 'email-preview');
    const labelNodes = findAll(item, (node) => node.tagName === 'span' && hasClass(node, 'label'));
    const attrs = [];
    if (hasClass(item, 'unread')) attrs.push('data-unread="true"');
    if (hasClass(item, 'active')) attrs.push('data-selected="true"');
    const labels = labelNodes.map((label) => {
      const classes = (getAttribute(label, 'class') || '').split(/\s+/);
      const variant = classes.find((cls) => cls.startsWith('label-'))?.replace('label-', '') || 'work';
      return `<mark data-label="${escapeHtml(variant)}">${escapeHtml(textContent(label).trim())}</mark>`;
    }).join('');
    return `
      <article ${attrs.join(' ')}>
        <div>
          <span>${escapeHtml(textContent(sender).trim())}</span>
          <span>${escapeHtml(textContent(time).trim())}</span>
        </div>
        <div>${escapeHtml(textContent(subject).trim())}</div>
        <div>${escapeHtml(textContent(preview).trim())}</div>
        ${labels ? `<div>${labels}</div>` : ''}
      </article>`;
  }).join('\n');
}

function getMailContentMarkup(contentNode) {
  const backButton = findFirst(contentNode, (node) => node.tagName === 'button');
  const header = findByClass(contentNode, 'email-header');
  const senderInfo = findByClass(header, 'email-sender-info');
  const avatar = findByClass(senderInfo, 'avatar');
  const senderDetails = findByClass(senderInfo, 'sender-details');
  const actionsContainer = findByClass(header, 'email-actions');
  const subject = findFirst(contentNode, (node) => node.tagName === 'h1' && hasClass(node, 'email-subject'));
  const bodySection = findByClass(contentNode, 'email-body');
  const sections = findChildrenByTag(contentNode, 'div');
  const attachments = sections.find((node) => hasClass(node, 'mt-8') && hasClass(node, 'pt-6'));
  const actionButtons = sections.find((node) => hasClass(node, 'mt-8') && hasClass(node, 'flex'));
  const actionButtonsClone = cloneNode(actionButtons);
  removeStructuralClasses(actionButtonsClone);
  const actionMarkup = serialize(actionButtonsClone);
  const buttons = findChildrenByTag(actionsContainer, 'button').map((button) => iconButtonMarkup(button)).join('\n');
  const detailsChildren = findChildrenByTag(senderDetails, 'h3').concat(findChildrenByTag(senderDetails, 'p'));
  const stamp = findFirst(header, (node) => node.tagName === 'span' && hasClass(node, 'text-sm'));
  const backButtonClone = cloneNode(backButton);
  removeStructuralClasses(backButtonClone);
  setAttribute(backButtonClone, 'type', 'button');
  setAttribute(backButtonClone, 'aria-label', 'Back to inbox');
  removeAttribute(backButtonClone, 'onclick');
  const attachmentClone = cloneNode(attachments);
  removeStructuralClasses(attachmentClone);

  return `
    <main id="email-content">
      ${serialize(backButtonClone)}
      <header>
        <div>
          <figure data-initials="${escapeHtml(textContent(avatar).trim())}"></figure>
          <div>
            <h3>${escapeHtml(textContent(detailsChildren[0]).trim())}</h3>
            <p>${escapeHtml(textContent(detailsChildren[1]).trim())}</p>
          </div>
        </div>
        <div>
          <span>${escapeHtml(textContent(stamp).trim())}</span>
          <div>
            ${buttons}
          </div>
        </div>
      </header>
      <h1>${escapeHtml(textContent(subject).trim())}</h1>
      <section>
        ${serializeChildren(bodySection)}
      </section>
      <section>
        ${serializeChildren(attachmentClone)}
      </section>
      ${actionMarkup}
    </main>`;
}

function buildEmailDocument(document, cssHref) {
  const body = getScriptlessBody(document);
  const sidebar = findByClass(body, 'email-sidebar');
  const emailMain = findByClass(body, 'email-main');
  const emailList = findByClass(emailMain, 'email-list');
  const emailContent = findByClass(emailMain, 'email-content');
  const sidebarChildren = (sidebar.childNodes || []).filter((child) => child.tagName);
  const logo = sanitizeFragment(sidebarChildren[0]);
  const compose = sanitizeFragment(sidebarChildren[1]);
  const primaryNav = sidebarChildren[2];
  const labelsSection = sidebarChildren[3];
  const footer = sidebarChildren[4];
  const topBar = findByClass(emailList, 'top-bar');
  const searchBlock = findFirst(emailList, (node) => node.tagName === 'div' && hasClass(node, 'px-4'));
  const mailBodyClasses = getBodyClasses(document);
  const navItems = findChildrenByTag(primaryNav, 'button').map((button) => getNavButtonMarkup(button)).join('\n');
  const refreshActions = findChildrenByTag(topBar, 'div')[0];
  const refreshButtons = findChildrenByTag(refreshActions, 'button').map((button) => iconButtonMarkup(button)).join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="mail">
<head>${getHeadMarkup(document, cssHref)}
</head>
<body${mailBodyClasses ? ` class="${escapeHtml(mailBodyClasses)}"` : ''}>
  <nav>
    <header>${logo}</header>
    ${compose}
    <ul>
${navItems}
    </ul>
${getLabelButtonsMarkup(labelsSection)}
${getUserFooterMarkup(footer)}
  </nav>
  <aside>
    <header>
      ${sanitizeFragment(findChildrenByTag(topBar, 'h2')[0])}
      <div>
        ${refreshButtons}
      </div>
    </header>
    <div>
      ${getSearchMarkup(searchBlock)}
    </div>
    <section>
${getEmailItemsMarkup(emailList)}
    </section>
  </aside>
${getMailContentMarkup(emailContent)}
  <script>
    document.querySelectorAll('html.mail aside article').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll('html.mail aside article').forEach((entry) => {
          entry.removeAttribute('data-selected');
          entry.removeAttribute('data-unread');
        });
        item.setAttribute('data-selected', 'true');
        if (window.innerWidth <= 768) {
          const panel = document.getElementById('email-content');
          if (panel) panel.setAttribute('data-mobile-visible', 'true');
        }
      });
    });

    function closeEmail() {
      const panel = document.getElementById('email-content');
      if (panel) panel.removeAttribute('data-mobile-visible');
    }

    const backButton = document.querySelector('html.mail main > button[aria-label="Back to inbox"]');
    if (backButton) {
      backButton.addEventListener('click', closeEmail);
    }
  </script>
</body>
</html>`;
}

function detectTemplate(document) {
  const body = getBodyNode(document);
  if (findByClass(body, 'email-layout')) return 'mail';
  return null;
}

function getPresetCss(template) {
  return fs.readFileSync(path.resolve(__dirname, `./presets/${template}.css`), 'utf8');
}

function transformTemplate(source, options = {}) {
  const document = getDocument(source);
  const template = options.template || detectTemplate(document);
  if (!template) {
    throw new Error('Unable to detect a supported semantic template adapter for this file.');
  }
  if (template !== 'mail') {
    throw new Error(`Unsupported semantic template adapter: ${template}`);
  }

  return {
    template,
    html: buildEmailDocument(document, options.cssHref),
    css: getPresetCss(template)
  };
}

function getDefaultOutputPaths(inputFile, template) {
  const directory = path.dirname(inputFile);
  const extension = path.extname(inputFile);
  const basename = path.basename(inputFile, extension);
  return {
    html: path.join(directory, `${basename}.semantic${extension}`),
    css: path.join(directory, `${basename}.${template}.css`)
  };
}

function writeTransformedTemplate(inputFile, options = {}) {
  const source = fs.readFileSync(inputFile, 'utf8');
  const initial = transformTemplate(source, { template: options.template });
  const outputs = {
    html: options.htmlOutput,
    css: options.cssOutput
  };
  const defaults = getDefaultOutputPaths(inputFile, initial.template);
  const htmlOutput = outputs.html || defaults.html;
  const cssOutput = outputs.css || defaults.css;
  const cssHref = path.relative(path.dirname(htmlOutput), cssOutput).replace(/\\/g, '/');
  const transformed = transformTemplate(source, { template: initial.template, cssHref });
  fs.mkdirSync(path.dirname(htmlOutput), { recursive: true });
  fs.mkdirSync(path.dirname(cssOutput), { recursive: true });
  fs.writeFileSync(htmlOutput, transformed.html);
  fs.writeFileSync(cssOutput, transformed.css);
  return {
    template: transformed.template,
    htmlOutput,
    cssOutput
  };
}

function runConfiguredTransforms(config = {}, baseDir = process.cwd()) {
  const jobs = Array.isArray(config.semanticTemplates) ? config.semanticTemplates : [];
  return jobs.map((job) => {
    const input = path.resolve(baseDir, job.input);
    const htmlOutput = job.htmlOutput ? path.resolve(baseDir, job.htmlOutput) : undefined;
    const cssOutput = job.cssOutput ? path.resolve(baseDir, job.cssOutput) : undefined;
    return writeTransformedTemplate(input, {
      template: job.template,
      htmlOutput,
      cssOutput
    });
  });
}

module.exports = {
  detectTemplate,
  transformTemplate,
  writeTransformedTemplate,
  runConfiguredTransforms
};
