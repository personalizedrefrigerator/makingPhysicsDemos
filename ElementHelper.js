"use strict";

const ElementHelper = {};
// LOADED_EDITOR is a constant that may be used to register
// events before this script is loaded. Re-declare it.
self.LOADED_EDITOR = "LOADED_EDITOR";
const CONSOLE_MODE_CLASS_NS = "consoleMode";
const SHOW_PREVIEW_INITIALLY = "initialPreview";

/*
  Turn elements in the table of contents into links!
  When clicked, the document scrolls to the content 
  with id matching the name of each item.
 */

ElementHelper.setupToc = async () =>
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
    // Convert 'pre's to textareas if marked 'interactive'.
    const toConvert = document.querySelectorAll("pre.interactive");

    for (const pre of toConvert)
    {
        const textarea = document.createElement("textarea");
        textarea.classList.add("code");
        textarea.value = pre.innerHTML;
        textarea.setAttribute("spellcheck", false);

        for (const classNS of pre.classList)
        {
            textarea.classList.add(classNS);
        }

        pre.replaceWith(textarea);
    }

    await JSHelper.nextAnimationFrame();

    // All textareas marked 'code'.
    const editables = document.querySelectorAll("textarea.code");

    for (const textarea of editables)
    {
        let content = textarea.value;
        const isConsoleMode = textarea.classList.contains(CONSOLE_MODE_CLASS_NS);
        const selectPreviewTab = textarea.classList.contains(SHOW_PREVIEW_INITIALLY);

        let editor = EditorHelper.replaceWithEditor(textarea, 
        { 
            height: 300, 
            font: "bold 11pt courier, calibri, monospace",
            noPreview: isConsoleMode,
            syncTextbox: isConsoleMode,
            defaultTab: selectPreviewTab ? "Preview" : undefined, // undefined => auto
        });

        if (textarea.getAttribute("id"))
        {
            JSHelper.Notifier.notify(LOADED_EDITOR + "#" + textarea.getAttribute("id"), editor);
        }

        if (isConsoleMode)
        {
            if (!textarea.classList.contains("linePerCmd"))
            {
                editor.openInteractiveConsole(content, 
                {
                    hideExitLine: true,
                });
            }
            else
            {
                const console = await editor.openInteractiveConsole(undefined,
                {
                    hideExitLine: true,
                });
                
                const lines = content.trim().split(/\s*[\n]+\s*/g);

                for (const line of lines)
                {
                    await console.run(line);
                }
            }
        }
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

ElementHelper.enableDetailsPanes = async () =>
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
                        titleHTML: "Aside: <b>" + label.textContent + "</b>",
                        className: "detailsPane",
                        unsnappable: true,
                        withPage: true,
                        noResize: true,
                        maxWidth: 600 // in px... See doc comment for SubWindowManager
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


(async () =>
{
    await ElementHelper.setupToc();
    await ElementHelper.renderMath();
    await ElementHelper.loadEditors();
    await ElementHelper.enableDetailsPanes();
})();
