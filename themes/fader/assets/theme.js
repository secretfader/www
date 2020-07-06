function setColorMode(mode) {
  document.documentElement.setAttribute('color-scheme', mode);
  localStorage.setItem('color-scheme', mode);
}

function toggleThemeMode(e) {
  if (e.currentTarget.className.indexOf('light') !== -1) {
    setColorMode('light');
    return;
  }

  setColorMode('dark');
}

function detectUserColorMode() {
  let preset = localStorage.getItem('color-scheme');

  if (preset) {
    setColorMode(preset);
    return;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setColorMode('dark');
  } else {
    setColorMode('light');
  }
}

detectUserColorMode();

document.querySelectorAll('button.theme-toggle').forEach(button => {
  button.addEventListener('click', toggleThemeMode);
});
