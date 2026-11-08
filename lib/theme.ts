// Light, dark or automatic (follow the device). The choice is kept in the
// visitor's own browser (localStorage), never in a cookie, and applied before
// the first paint so the page doesn't flash in the wrong colours.

export const THEME_KEY = "eezzyflow-theme";
export type ThemeChoice = "light" | "dark" | "auto";

export const themeScript = `(function(){try{var c=localStorage.getItem("${THEME_KEY}")}catch(e){}var d=c==="dark"||(c!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light"})()`;
