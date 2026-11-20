/* projects-data.js — the single source of truth for the Projects page.
   Edit this array to add, remove, or reword a project. */
window.PROJECTS = [
  {
    name: 'threetwentyfive',
    description:
      "Coursework for ITM 325 (AI for Business) at UH Mānoa — in-class " +
      "exercises in building for the web. This portfolio lives here.",
    url: 'https://github.com/chunw4h/threetwentyfive',
    language: 'JavaScript',
    license: null,
    created: '2026-11-14',
    fork: false,
  },
  {
    name: 'warptux',
    description:
      'A simplified way to get Cloudflare’s 1.1.1.1 up and running on Linux ' +
      'in one line — copy, paste, enter, go.',
    url: 'https://github.com/chunw4h/warptux',
    language: 'Shell',
    license: 'GPL-3.0',
    created: '2026-11-11',
    fork: true,
  },
  {
    name: 'juiceit',
    description:
      'A small, simple auto-install script for Orange3 on macOS. ' +
      'Self-directed project for ITM 325.',
    url: 'https://github.com/chunw4h/juiceit',
    language: 'Shell',
    license: 'GPL-3.0',
    created: '2026-09-10',
    fork: false,
  },
  {
    name: 'chunw4h',
    description: 'My personal repository of things — the profile README.',
    url: 'https://github.com/chunw4h/chunw4h',
    language: null,
    license: null,
    created: '2026-09-08',
    fork: false,
  },
];

// In event of changing to live fetch URL, this should serve to keep things in order
function safeHref(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}
