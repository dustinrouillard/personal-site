const themes = {
  dark: {
    'alt-text': "#000000",
    text: "#ffffff",
    "highlight-color": "#127796",
    "widget-background": "#393939",
    background: "#181a1b",
    lightstrand: "#ffffff"
  },
  light: {
    'alt-text': "#ffffff",
    text: "#000000",
    "highlight-color": "#127796",
    "widget-background": "#c8c8c8",
    background: "#ffffff",
    lightstrand: "#436046"
  },
};

export function SetTheme(theme_name: "light" | "dark") {
  const theme = themes[theme_name];
  for (const key in theme)
    document.documentElement.style.setProperty(`--${key}`, theme[key]);
  localStorage.setItem("theme-name", theme_name);
}

export function ToggleTheme(): string {
  const current_theme = localStorage.getItem("theme-name") || "light";
  SetTheme(current_theme == "light" ? "dark" : "light");
  return current_theme == "light" ? "dark" : "light";
}
