"use strict";

/**
 * This script converts all textarea
 * regions marked with class "code"
 * into tabbed editors.
 */

function loadEditors()
{
    const editables = document.querySelectorAll("textarea.code");

    for (const textarea of editables)
    {
        EditorHelper.replaceWithEditor(textarea);
    }
}

requestAnimationFrame(loadEditors);