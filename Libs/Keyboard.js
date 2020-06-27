"use strict";

function Key(name, x, y, w, h, command)
{
    this.command = command || function () {};
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;

    var lastClickPoint = undefined;

    var me = this;

    this.checkCollision = function(point)
    {
        return (point.x > me.x && point.x < me.x + me.w && point.y > me.y && point.y < me.y + me.h);
    };

    this.handleClick = function(point)
    {
        lastClickPoint = point;

        if (me.checkCollision(point))
        {
            me.command();
        }
    };

    this.getWidth = function()
    {
        return me.w;
    };

    this.getContentWidth = function(ctx)
    {
        var width = ctx.measureText(me.name).width;

        return width;
    };

    this.updateWidthWithPadding = function(ctx, allocatedPadding)
    {
        var width = me.getContentWidth(ctx) + allocatedPadding;
        me.w = width;

        return width;
    };

    this.setX = function(newX)
    {
        me.x = newX;
    };

    this.setY = function(newX)
    {
        me.y = newX;
    };

    this.render = function(ctx)
    {
        ctx.beginPath();
        ctx.save();
        if (lastClickPoint && me.checkCollision(lastClickPoint))
        {
            ctx.fillStyle = "#0055ee";
            ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = -2;
            ctx.shadowOffsetY = -2;
        }
        else
        {
            ctx.fillStyle = "black";
        }

        ctx.strokeStyle = "white";
        ctx.rect(me.x, me.y, me.w, me.h);

        ctx.fill();
        ctx.stroke();

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillStyle = "white";
        ctx.fillText(me.name, me.x + me.w / 2, me.y + me.h / 2);
        ctx.restore();
    };
}

var LEFT_ARROW = "◀️";
var RIGHT_ARROW = "▶️";

function Keyboard(ctx, keyPressed)
{
    var me = this;
    this.onkeypress = keyPressed;
    this.ctx = ctx;
    var emojiStart = "◀️".charAt(0);
    this.keyChars = ["1▪2▪3▪4▪5▪6▪7▪8▪9▪0▪-▪+", "q▪w▪e▪r▪t▪y▪u▪i▪o▪p▪,▪⏪", "🔠▪a▪s▪d▪f▪g▪h▪j▪k▪l▪⬆️", "◀️▪z▪x▪c▪v▪b▪n▪m▪.▪;▪▶️", "🔼▪<▪=▪_SPACE_▪{▪}▪>▪/▪🔽",
    "\'▪\"▪;▪:▪_▪[▪]▪&&▪||▪(▪)▪⏬",
"💾▪📂▪✂️▪📜▪📋▪📌▪ℹ▪⚜▪🚘▪⏬"];
    this.shiftKeyChars = ["!▪@▪#▪$▪%▪^▪~▪\`▪*▪_▪(▪)", "q▪w▪e▪r▪t▪y▪u▪i▪o▪p▪:▪⏪", "🔡▪a▪s▪d▪f▪g▪h▪j▪k▪l▪⬆️", "◀️▪z▪x▪c▪v▪b▪n▪m▪?▪\\▪▶️", "🔼▪\"▪'▪_SPACE_▪[▪]▪&▪|▪🔽",
    "//▪/*▪*/▪=>▪}▪[▪]▪~▪*▪(▪)▪⏬",
"🗂️▪⚙️▪✂️▪📜▪📋▪⚗️▪➖▪➕▪🔎▪⏬"];

    for (var i = 0; i < this.shiftKeyChars.length; i++)
    {
        this.shiftKeyChars[i] = this.shiftKeyChars[i].toUpperCase();
    }

    this.x = 0;
    this.y = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.keys = [];
    this.shiftKeys = [];

    var font = "11pt sans-serif, serif";

    me.ctx.font = font;

    var keyH = this.ctx.measureText("W....").width;

    this.shiftPressed = false;
    this.capsLock = false;

    this.toggleCaps = function()
    {
        me.capsLock = !me.capsLock;
        me.shiftPressed = me.capsLock;
    };

    this.loadKeys = function(keyChars, keys)
    {
        var x = me.x;
        var y = me.y;

        var addKey = function(name)
        {
            var key = new Key(name, x, y, 20, keyH, function()
            {
                if (name == "⬆️")
                {
                    me.toggleCaps();
                }
                else if (name === "🔠")
                {
                    me.shiftPressed = true;
                }
                else if (name === "🔡")
                {
                    me.shiftPressed = false;
                }
                else
                {
                    me.onkeypress(name);

                    if (!me.capsLock)
                    {
                        me.shiftPressed = false;
                    }
                }
            });

            x += key.getContentWidth(me.ctx);

            keys.push(key);
        };

        var distributePadding = (keyCount) =>
        {
            const extraSpace = ctx.canvas.width - x;
            const padding = extraSpace / keyCount; 

            // Nothing to distribute
            if (extraSpace <= 0)
            {
                return;
            }

            x = me.x;

            for (let i = keys.length - keyCount; i < keys.length; i++)
            {
                keys[i].updateWidthWithPadding(ctx, padding);
                keys[i].setX(x);
                x += keys[i].getWidth();
            }
        };

        var row;
        var currentChar;

        for (var i = 0; i < keyChars.length; i++)
        {
            row = keyChars[i].split("▪");

            for (var j = 0; j < row.length; j++)
            {
                currentChar = row[j];



                addKey(currentChar);

            }

            distributePadding(row.length);

            if (x > me.maxX + 1)
            {
                me.maxX = x + 1;
            }

            y += keyH + 1;
            x = me.x;
        }

        if (y > me.maxY + 1)
        {
            me.maxY = y + 1;
        }
    };

    this.handleClick = function(point)
    {
        var keys = me.shiftPressed ? me.shiftKeys : me.keys;

        for (var i = 0; i < keys.length; i++)
        {
            keys[i].handleClick(point);
        }
    };

    this.render = function()
    {
        me.ctx.clearRect(me.x, me.y, me.maxX, me.maxY);
        me.ctx.font = font;

        var keys = me.shiftPressed ? me.shiftKeys : me.keys;

        for (var i = 0; i < keys.length; i++)
        {
            keys[i].render(me.ctx);
        }
    };

    this.loadKeys(me.keyChars, me.keys);
    this.loadKeys(me.shiftKeyChars, me.shiftKeys);
}

