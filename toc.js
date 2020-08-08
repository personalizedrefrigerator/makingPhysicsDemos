"use strict";

/*
  Turn elements in the table of contents into links!
  When clicked, the document scrolls to the content 
  with id matching the name of each item.
 */

const TOCHelper = {};

TOCHelper.setupToc = () =>
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

TOCHelper.setupToc();