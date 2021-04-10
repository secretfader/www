function setColorMode(mode) {
  document.documentElement.setAttribute("color-scheme", mode);
  localStorage.setItem("color-scheme", mode);
}

function detectUserColorMode() {
  const preset = localStorage.getItem("color-scheme");

  if (preset) {
    setColorMode(preset);
    return;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setColorMode("dark");
  } else {
    setColorMode("light");
  }
}

detectUserColorMode();
