// Copyright 2020 Nicholas Young. All rights reserved.

const select = '.theme-toggle input[type="checkbox"]';
const toggle = document.querySelector(select);

function toggleThemeMode(e) {
  if (e.target.checked) {
    setColorMode('dark')
  }

  setColorMode('light');
}

export function setupThemeSelector() {
  if (!toggle) {
    return;
  }

  toggle.addEventListener('change', (e) => {
    toggleThemeMode(e);
  }, false);
}
