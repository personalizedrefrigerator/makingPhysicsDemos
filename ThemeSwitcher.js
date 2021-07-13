"use strict";

// @requires StorageHelper

/**
 * @param target The HTMLElement to apply the selected theme to.
 * @param options A map from theme names to CSS class names that are
 *     applied to [target] when a theme is selected.
 */
function ThemeSwitcher(target, options)
{
    const PAGE_THEME_STORAGE_KEY = "PAGE_THEME";

    options = options || {};
    options.themes = options.themes
        || { "light": "lightTheme", "dark": "darkTheme" };
    options.defaultTheme = "lightTheme";

    const themeToClassNameMap = options.themes;
    let currentTheme = StorageHelper.get(PAGE_THEME_STORAGE_KEY)
        || options.defaultTheme;

    let switcherElem = document.createElement("button");
    switcherElem.classList.add("themeSwitcher");
    switcherElem.innerHTML = "☀️";

    let themes = [];
    let themeIdx = 0;
    for (const name in options.themes)
    {
        if (name == currentTheme)
        {
            themeIdx = themes.length;
        }

        themes.push(name);
    }

    const themeNameToIdx = (name) =>
    {
        for (let i = 0; i < themes.length; i++)
        {
            if (themes[i] == name)
            {
                return i;
            }
        }

        return -1;
    };

    this.setTheme = (themeName) =>
    {
        target.classList.remove(themeToClassNameMap[currentTheme]);
        target.classList.add(themeToClassNameMap[themeName]);

        currentTheme = themeName;
        themeIdx = themeNameToIdx(currentTheme);
        StorageHelper.put(PAGE_THEME_STORAGE_KEY, themeName);
    };

    const nextTheme = () =>
    {
        themeIdx = (themeIdx + 1) % themes.length;
        this.setTheme(themes[themeIdx]);
    };

    switcherElem.addEventListener("click", () => nextTheme());

    this.setTheme(currentTheme);
    this.elem = switcherElem;

    target.appendChild(switcherElem);
}

