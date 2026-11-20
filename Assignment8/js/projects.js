/* projects.js — renders the Projects page from window.PROJECTS. */
(() => {
  'use strict';

  const list = document.querySelector('[data-project-list]');
  if (!list) return;

  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  const LANG_COLORS = {
    JavaScript: '#f1e05a',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
  };

  const dateFmt = new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  });

  function metaItem(text, langColor) {
    const li = document.createElement('li');
    if (langColor) {
      const dot = document.createElement('span');
      dot.className = 'lang-dot';
      dot.style.setProperty('--lang-color', langColor);
      dot.setAttribute('aria-hidden', 'true');
      li.append(dot);
    }
    li.append(document.createTextNode(text));
    return li;
  }

  function createCard(p) {
    const li = document.createElement('li');
    li.className = 'project-card';

    const h3 = document.createElement('h3');
    h3.className = 'project-card__title';

    const a = document.createElement('a');
    a.href = p.url;
    a.textContent = p.name;
    a.rel = 'noopener';
    h3.append(a);

    if (p.fork) {
      const badge = document.createElement('span');
      badge.className = 'project-card__badge';
      badge.textContent = 'Fork';
      h3.append(badge);
    }

    const desc = document.createElement('p');
    desc.className = 'project-card__desc';
    desc.textContent = p.description;

    const meta = document.createElement('ul');
    meta.className = 'project-card__meta';

    if (p.language) {
      meta.append(
        metaItem(p.language, LANG_COLORS[p.language] || 'var(--c-text-dim)')
      );
    }
    if (p.license) meta.append(metaItem(p.license));
    if (p.created) {
      const d = new Date(`${p.created}T00:00:00Z`);
      if (!Number.isNaN(d.getTime())) meta.append(metaItem(dateFmt.format(d)));
    }

    li.append(h3, desc, meta);
    return li;
  }

  const sorted = [...projects].sort((a, b) => {
    const ta = Date.parse(a.created) || 0;
    const tb = Date.parse(b.created) || 0;
    return tb - ta;
  });


  const frag = document.createDocumentFragment();
  sorted.forEach((p) => frag.append(createCard(p)));
  list.append(frag);
})();
