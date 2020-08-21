// Copyright 2020 Nicholas Young. All rights reserved.

export function setupThemeSelector() {
  const selector = document.querySelectorAll('input.theme-toggle[type="checkbox"]');

  for (el of selector) {
    el.addEventListener('change', toggleThemeMode);
  }
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

function toggleThemeMode(e) {
  if (e.target.checked) {
    setColorMode('dark')
  }

  setColorMode('light');
}
