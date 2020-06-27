"use strict";

/*
    Something that can be moved through pointer-interaction.
    The parameter, content, is the HTML Element on which a
    listener is placed that shows the dragElement, and calls
    onDrag(delta x, delta y, client x, client y) while the
    content is dragged.
    The trackWindowScroll parameter is a boolean. If true, 
    dx includes changes in window.scrollX and dy includes
    changes in window.scrollY.
*/
function DraggableElement(content, dragElement, onDrag, trackWindowScroll)
{
    var pointerDown = false;
    var lastX, lastY, lastClientX, lastClientY;
    this.onDrag = onDrag;
    this.onBeforeDrag = function() {};
    
    var me = this;

    var eventToPosition = (event) =>
    {
        let x, y;
        
        // If we don't have clientX, clientY (we don't know
        // the type of the given event), re-use the previous.
        // It might be that the mouse has not moved but the 
        // viewport has.
        if (event.clientX !== undefined && event.clientY !== undefined)
        {
            x = event.clientX;
            y = event.clientY;

            lastClientX = x;
            lastClientY = y;
        }
        else
        {
            x = lastClientX;
            y = lastClientY;
        }

        if (trackWindowScroll)
        {
            x += window.scrollX;
            y += window.scrollY;
        }

        return { x: x, y: y };
    };
    
    var eventStart = function(event)
    {
        event.preventDefault();
    
        pointerDown = true;
        dragElement.style.display = "block";

        const position = eventToPosition(event);

        lastX = position.x;
        lastY = position.y;
        
        me.onBeforeDrag(lastX, lastY);
    };
    
    var eventMove = function(event)
    {
        if (pointerDown)
        {
            event.preventDefault();
            
            const position = eventToPosition(event);
            var x = position.x;
            var y = position.y;
        
            var dx = x - lastX;
            var dy = y - lastY;
            
            me.onDrag(dx, dy, x, y);
            
            lastX = x;
            lastY = y;
        }
    };
    
    var eventEnd = function(event)
    {
        event.preventDefault();
    
        pointerDown = false;
        dragElement.style.display = "none";
    };

    // At the time of this writing, Safari DID NOT support
    //pointer events. TODO Due to this, when the first pointer
    //event is fired, note that other event handlers can
    //ignore their input.
    JSHelper.Events.registerPointerEvent("down", content, function(e)
    {
        eventStart(e);
        
        return true;
    });
    
    JSHelper.Events.registerPointerEvent("move", dragElement, function(e)
    {
        eventMove(e);
        
        return true;
    });
    
    JSHelper.Events.registerPointerEvent("stop", dragElement, function(e)
    {
        eventEnd(e);
        
        return true;
    });

    JSHelper.Events.registerPointerEvent("move", content, function(e)
    {
        eventMove(e);
        
        return true;
    });
    
    JSHelper.Events.registerPointerEvent("up", content, function(e)
    {
        eventEnd(e);
        
        return true;
    });

    if (trackWindowScroll)
    {
        document.addEventListener("scroll", function(e)
        {
            // Allow the browser to defer eventMoves.
            requestAnimationFrame(() => eventMove(e));
        });
    }
}


