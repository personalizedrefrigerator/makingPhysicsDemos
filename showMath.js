"use strict";

/**
 * Replace all class="math" elements with a KaTeX-based
 * rendering of their contents (assuming KaTeX-based
 * contents).
 */

function renderMath()
{
    const mathElements = document.querySelectorAll(".math");

    let macros = {};

    for (const elem of mathElements)
    {
        katex.render(elem.innerHTML, elem,
        { // Options for the KaTeX renderer. See https://katex.org/docs/options.html
            throwOnError: false,
            errorColor: "#ff0000",
            macros: macros
        });
    }
}

requestAnimationFrame(renderMath);
