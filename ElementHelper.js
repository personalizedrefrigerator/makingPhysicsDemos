"use strict";

const ElementHelper = {};

/*
  Turn elements in the table of contents into links!
  When clicked, the document scrolls to the content 
  with id matching the name of each item.
 */

ElementHelper.setupToc = () =>
{
    // Find the table of contents.
    const toc = document.querySelectorAll("ul.toc li");

    const handleTocItem = (elem) =>
    {
        const destinationId = elem.getAttribute("name");
        const destination = document.getElementById(destinationId);

        if (!destination)
        {
            console.error("Unable to find element with id " + destinationId);
            return;
        }

        // Allow the user to select the entry using the tab key.
        elem.setAttribute("tabindex", "0");

        const onSelected = () =>
        {
            destination.scrollIntoView();
        };

        elem.addEventListener("click", () =>
        {
            onSelected();
        });

        elem.addEventListener("keydown", (event) =>
        {
            if (event.keyCode == 13) // Enter key.
            {
                onSelected();
            }
        });
    };

    for (const elem of toc)
    {
        handleTocItem(elem);
    }
};

/**
 * Replace all class="math" elements with a KaTeX-based
 * rendering of their contents (assuming KaTeX-based
 * contents).
 */
ElementHelper.renderMath = async () =>
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
};

/**
 * This script converts all textarea
 * regions marked with class "code"
 * into tabbed editors.
 */
ElementHelper.loadEditors = async () =>
{
    const editables = document.querySelectorAll("textarea.code");

    for (const textarea of editables)
    {
        EditorHelper.replaceWithEditor(textarea, 
        { 
            height: 300, 
            font: "11pt courier, calibri, monospace" 
        });
    }
};

/**
 * Convert regions of text given the "aside"
 * classlabel into clickable regions, displaying the 
 * contents of the second child of the region.
 * For example,
 *  span class=aside id=asidecontentid:
 *    |  Label text.
 * Elsewhere,
 *  div class=asideData,asidecontentid
 *    | Display this when "Label text." is clicked.
 */

ElementHelper.enableDetailsPanes = () =>
{
    const toConvert = document.querySelectorAll(".aside");
    
    for (const elem of toConvert)
    {
        (function(elem)
        {
            const label = elem;
            const description = document.querySelector(".asideData." + elem.getAttribute("id"));

            var currentWindow;

            description.remove();
            description.classList.remove("asideData");

            label.style.display = "inline";
            label.setAttribute("tabindex", 0);

            label.addEventListener("click", async () =>
            {
                if (currentWindow)
                {
                    await currentWindow.close();
                }

                const detailsWindow = SubWindowHelper.create
                (
                    {
                        title: "Aside: " + label.textContent,
                        className: "detailsPane",
                        unsnappable: true,
                        withPage: true,
                        noResize: true,
                    }
                );

                currentWindow = detailsWindow;

                const content = document.createElement("div");
                content.appendChild(description);

                detailsWindow.appendChild(content);
            });
        })(elem);
    }
};



ElementHelper.setupToc();
ElementHelper.renderMath();
ElementHelper.loadEditors();
ElementHelper.enableDetailsPanes();
