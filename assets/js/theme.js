// Copyright 2020 Nicholas Young. All rights reserved.

function toggleThemeMode(e) {
  if (e.target.checked) {
    setColorMode('dark')
  }

  setColorMode('light');
}

export function setupThemeSelector() {
  const select = '.theme-toggle input[type="checkbox"]';
  const toggle = document.querySelector(select);

  if (!toggle) {
    return;
  }

  toggle.addEventListener('change', (e) => {
    toggleThemeMode(e);
  }, false);
}

export function setupExternalLinks() {
  const selector = document.querySelectorAll('a');

  for (el of selector) {
    const ext = !(el.href && el.href.indexOf(document.domain) !== -1);

    if (ext) {
      el.setAttribute('target', '_blank');
    }
  }
}
