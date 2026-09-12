
export const THEME_STORAGE_KEY = "theme";

export function resolveInitialTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    console.log("Error");
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
