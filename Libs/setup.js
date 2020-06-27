"use strict";

/**
 * Injects stylesheets necessary for other librarys' proper functioning.
 */

const styleSheets = `
@keyframes fadeIn
{
    0% { filter: opacity(0%); }
    100% { filter: opaicty(100%); }
}

@keyframes fadeOut
{
    0% { filter: opacity(100%); display: block; }
    100% { filter: opacity(0%); display: none; }
}

.windowContainer
{
    box-shadow: 2px 1px 24px rgba(100, 100, 100, 0.6);
    position: fixed;
    background-color: rgba(200, 200, 200, 0.8);
    
    border-top-left-radius: 7px;
}

.windowContainerContent
{
    overflow-y: auto;
}

.windowContainerTitleBar
{
    background-image: radial-gradient(rgba(255, 255, 255, 0.8), rgba(200, 200, 200, 0.9));
    background-size: 4px 3px;
    
    font: 12pt Sans;
    text-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
    color: black;
    
    padding: 4px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 7px;
    
    user-select: none !important;
    
    cursor: initial;
    
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
}

.windowContainerTabZone
{
    background-color: #aaaaaa;
    font: 12pt Sans;
    
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.4);
}

.baseTab
{
    cursor: pointer;
    border-bottom: 2px groove gray;
}

.baseTabLabel
{
    padding-right: 5px;
    margin-top: 3px;
    margin-bottom: 3px;
}

.baseMenu
{
    background-color: #aaaaaa;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
    
    animation: fadeIn 0.2s ease;
}

.windowContainerCloseButton
{
    transition: 0.3s ease all;
    
    text-shadow: 0px 0px 3px rgba(255, 0, 0, 0.95);
    color: #bbbbbb;
    
    filter: blur(1px);
    
    animation: fadeIn 0.5s ease;
}

.windowContainerCloseButton:hover
{
    transform: matrix(1, 0, 0.1, 0.9, 0, 0);
    filter: blur(0px);
}

.windowContainerMinimizeButton, .windowContainerMaximizeButton
{
    padding-left: 7px;
    margin-right: 6px;
    margin-left: 4px;
    
    border-color: #dddddd;
    border-style: ridge;

    cursor: pointer;
    
    filter: blur(1px);
    
    transform: rotate(0deg);
    
    transition: 1s ease all;
}

.windowContainerMinimizeButton:hover, .windowContainerMaximizeButton:hover
{
    transform: rotate(1deg);
}

.windowContainerMinimizeButton
{
    border-bottom-width: 3px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
}

.windowContainerMaximizeButton
{
    border-top-width: 2px;
    border-left-width: 2px;
    border-right-width: 2px;
    border-bottom-width: 2px;
}

.windowDragElement
{
    top: 0;
    left: 0;
}

.windowContainerResizeZone
{
    animation: fadeIn 0.5s ease;
    
    position: fixed;
    border: 1px solid gray;
    
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
    
    padding: 7px;
    
    border-radius: 100%;
}

/* Inserted File.  "widgetStyles.css". */
.progressBarContainer
{
    padding: 0px;
    display: block;
    
    border-radius: 4px;
    box-shadow: inset 2px -2px 3px rgba(0, 0, 0, 0.9);
    
    background-color: rgba(100, 100, 100, 0.4);
    background-image: radial-gradient(rgba(100, 100, 100, 0.3), rgba(150, 10, 150, 0.4), rgba(150, 10, 150, 0.6));
    background-size: 3px 3px;
    
    height: 25px;
}

.progressBarTrack
{
    margin: 0px;
    padding: 0px;
    
    height: 25px;
    width: 0px;
    
    background-color: rgba(255, 255, 0, 0.8);
    background-image: linear-gradient(10deg, rgba(100, 255, 255, 0.8), rgba(0, 255, 200, 0.5), rgba(100, 255, 255, 0.8));
    
    transition: 0.5s ease width;
}

.smallInput
{
    width: 50px;
}

/* A different type of tab. */
.hiddenTab
{
    animation: 0.5s ease fadeOut;
    display: none;
}

@keyframes transitTabLabelUnselect
{
    0% { background-color: rgba(100, 20, 200, 0.8); }
    100% { background-color: rgba(0, 0, 0, 0.6); }
}

@keyframes transitTabLabelSelect
{
    0% { background-color: rgba(0, 0, 0, 0.6); }
    100% { background-color: rgba(100, 20, 200, 0.8); }
}

.tabLabel
{
    border-top: 1px solid white;
    border-left: 1px solid white;
    border-right: 1px solid white;
    
    box-shadow: 1px 2px 2px rgba(0, 255, 0, 0.7);
    
    padding: 4px;
    
    margin-right: 5px;
    
    border-top-left-radius: 4px;
    
    color: white;
    
    background-color: rgba(0, 0, 0, 0.6);
    
    font: 12pt Calibri, Monospace, Sans;
    
    flex-grow: 1;
    
    transition: 0.5s ease all;
    
    cursor: pointer;
    
    transform: rotate(0deg);
    
    transition: 0.5s ease all;
}

.tabLabelShown
{
    animation: 0.5s ease fadeIn;
}

.tabLabelHidden
{
    animation: 0.5s ease fadeOut;
    display: none;
}

.tabContentShown
{
    animation: 0.5s ease fadeIn;
    
    flex-grow: 1;
}

/* TODO This is UGLY. Fix it. */
span.tabContentShown
{   
    display: flex;
}

span.tabContentShown > input, span.tabContentShown > button
{
    flex-grow: 1;
}

.tabContentHidden
{
    animation: 0.5s ease fadeOut;
    display: none;
}

.tabLabelUnselected
{
    animation: 0.5s ease transitTabLabelUnselect;
    background-color: rgba(0, 0, 0, 0.6);
    
    font-size: 9pt;
}

.tabLabelSelected
{
    animation: 0.5s ease transitTabLabelSelect;
    background-color: rgba(100, 20, 200, 0.8);
    
    box-shadow: 1px 2px 3px rgba(255, 255, 255, 0.9);
    
    font-size: 12pt;
    
    cursor: cross;
}

.tabLabelUnselected:hover
{
    transform: rotate(2deg) scale(0.9, 1);
    margin-right: 0px;
}

.tabDisplay
{
    display: flex;
    flex-direction: row;
}

.tabGroupContainer
{
    width: 100%;
}


.codeEditor
{
    background-color: rgba(0, 0, 0, 0.9);
    overflow-y: hidden;
    flex-direction: column;
}

.codeEditor canvas
{
    flex-shrink: 1;
    flex-grow: 1;
    min-height: 0;
    min-width: 0;
}

code
{
    background-color: #dddddd;
    color: black;
    border-radius: 8px;
    padding: 1px 5px 1px 5px;
    font-family: 'Courier New', Courier, monospace;

    background-image: radial-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.0));
    background-size: 3px 3px;
}

input, button
{
    background-color: rgba(155, 100, 255, 0.6);
    background-image: linear-gradient(16deg, rgba(100, 100, 255, 0.7), rgba(100, 0, 100, 0.4), rgba(100, 100, 255, 0.7));
    
    border: 1px solid #667766;
    border-radius: 6px;
    
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
    
    min-width: 1px;
    
    font: 12pt Serif;
    color: black;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
    
    transform: matrix(1, 0, 0, 1, 0, 0);
    
    transition: 0.5s ease all;
}

input:hover, button:hover, input:active, button:active
{
    transform: matrix(1.0, 0, 0.05, 0.9, 0, 0);
    
    background-color: rgba(155, 100, 200, 0.7);
}

canvas
{
    user-select: none;
}`;

const styleSheetElement = document.createElement("style");

// Allow the browser to defer this code.
requestAnimationFrame(function()
{
    document.body.appendChild(styleSheetElement);
    styleSheetElement.outerHTML = "<style>" + styleSheets + "</style>";
});

const ABOUT_PROGRAM = 
`
    This program is licensed to tou under version two
    of the Mozilla Public License. A copy of this license
    should have been distributed with this program.
`;

const DISCLAIMER =
`
    ~~~THIS PROGRAM HAS SLOPPY CODE~~~
        While viewing this page's 
    JavaScript, please note that much
    of it was written using an older
    version of the keyboard included in
    Keyboard.js and a standard
    mobile-device keyboard. As a result,
    much of this page's code is sloppy.
    Please do not use it as an example
    of how to write code. Regardless,
    welcome to the console/debugger
    and may your interest in the
    source of websites/web-apps take
    you far.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    ~~~~~THIS PROGRAM IS STILL~~~~~~
    ~~~~~UNDER DEVELOPMENT    ~~~~~~
        There will be bugs! Work may
    be lost! Segments could hang or
    even crash. Please avoid usage
    of this program for ANYTHING
    important until it has reached
    a stable state.
    
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`;


WebAssembly.Module; // Might fix a bug in Safari.
