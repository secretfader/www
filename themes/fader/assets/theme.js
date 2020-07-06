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
  if (localStorage.getItem('color-scheme') === 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !localStorage.getItem('color-scheme')))
  {
    document.documentElement.setAttribute('color-scheme', 'dark');
  }
}

detectUserColorMode();

const buttons = document.querySelectorAll('.theme-toggle');
buttons.forEach(button => {
  button.addEventListener('click', toggleThemeMode);
});
