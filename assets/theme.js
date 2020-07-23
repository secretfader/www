function toggleThemeMode(e) {
  console.log(e);
  if (e.target.checked) {
    setColorMode('dark')
  }

  setColorMode('light');
}

const selector = '.theme-switch input[type="checkbox"]';

const toggle = document.querySelector(selector);
toggle.addEventListener('change', toggleThemeMode, false);
