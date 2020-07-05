function toggleThemeMode(e) {
  if (e.currentTarget.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('color-mode', 'dark');
    return;
  }

  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('color-mode', 'light');
}

const buttons = document.querySelectorAll('.theme-toggle');
buttons.forEach(button => {
  button.addEventListener('click', toggleThemeMode);
});
