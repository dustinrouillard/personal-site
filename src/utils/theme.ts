const themes = {
  dark: {
    text: "#ffffff",
    "highlight-color": "#127796",
    "widget-background": "#393939",
    background: "#181a1b",
  },
  light: {
    text: "#000000",
    "highlight-color": "#127796",
    "widget-background": "#c8c8c8",
    background: "#ffffff",
  },
};

export function SetTheme(theme_name: "light" | "dark") {
  const theme = themes[theme_name];
  for (const key in theme)
    document.documentElement.style.setProperty(`--${key}`, theme[key]);
  localStorage.setItem("theme-name", theme_name);
}

export function ToggleTheme() {
  const current_theme = localStorage.getItem("theme-name") || "light";
  SetTheme(current_theme == "light" ? "dark" : "light");
  return;
}
