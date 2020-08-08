"use strict";

/**
 * Replace all class="math" elements with a KaTeX-based
 * rendering of their contents (assuming KaTeX-based
 * contents).
 */

function renderMath()
{
    const mathElements = document.querySelectorAll(".math");

    // Make all custom macro definitions here.
    let macros = 
    { 
        // Based on KaTeX 12.0's definition of the macro \\KaTeX
        "\\MaTh": "\\textbf{\\textrm{M\\hspace{-0.2em}\\raisebox{0.2em}{\\scriptstyle A}\\hspace{-0.2em}T\\hspace{-0.2em}\\raisebox{-0.1em}{\\small H}}}",
        
        // A centered mod operator.
        "\\mmod": "\\textrm{ mod }"
    };

    for (const elem of mathElements)
    {
        katex.render(elem.textContent, elem,
        { // Options for the KaTeX renderer. See https://katex.org/docs/options.html
            throwOnError: false,
            errorColor: "#ff0000",
            macros: macros
        });
    }
}

requestAnimationFrame(renderMath);
