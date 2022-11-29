"use strict";

const image = new Image();
image.src = "./assets/img/flappy-bird-set.png";

const canvas = document.querySelector("canvas");
const rectCanvas = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

let secondsPassed = 0;
let oldTimestamp = 0;
let timePassed = 0;
let y = 0;

class Background
{
    constructor()
    {
        this.x = 0;
    }

    drawBackgound(x)
    {
        ctx.drawImage(
            image,
            0, 0,
            433, 768,
            x, 0,
            rectCanvas.width, rectCanvas.height
        );
        ctx.drawImage(
            image,
            0, 0,
            433, 768,
            x+433-1, 0,
            rectCanvas.width, rectCanvas.height
        );
    }

    move()
    {
        setInterval(() => {
            if (this.x > -432)
                this.x--;
            else
                this.x = 0;
        }, 20);
    }
}

class Bird
{
    constructor()
    {
        this.pos = {x: 0, y: 0};
        this.size = {w: 50, h: 36};
        // this.rotation = 0;
        this.drawBirdType =
        {
            down: function(pos)
            {
                background.drawBackgound(background.x);
                ctx.drawImage(
                    image,
                    433, 0,
                    50, 36,
                    pos.x, pos.y,
                    50, 36
                );
            },

            fly: function(pos)
            {
                background.drawBackgound(background.x);
                ctx.drawImage(
                    image,
                    433, 36,
                    50, 36,
                    pos.x, pos.y,
                    50, 36
                );
            },

            up: function(pos)
            {
                background.drawBackgound(background.x);
                ctx.drawImage(
                    image,
                    433, 72,
                    50, 36,
                    pos.x, pos.y,
                    50, 36
                );
            }
        };

    }

    init()
    {
        this.pos.x = rectCanvas.width/2-this.size.w/2;
        this.pos.y = rectCanvas.height/2-this.size.h/2;

        window.requestAnimationFrame(bird_logic.loop);
    }
}

const bird_logic =
{
    loop: function(timestamp)
    {
        secondsPassed = (timestamp-oldTimestamp)/1000;
        oldTimestamp = timestamp;
    
        bird_logic.update(secondsPassed);
        bird.drawBirdType.fly(bird.pos);
    
        window.requestAnimationFrame(bird_logic.loop);
    },

    update: function(secondsPassed)
    {
        timePassed += secondsPassed;
    
        window.addEventListener("mousedown", () =>
        {
            timePassed = 0;
            y = bird.pos.y;
        })

        bird.pos.y = bird_logic.easeInOutQuint(timePassed*3, y, -150, 1);
    },

    easeInOutQuint: function(t, b, c, d)
    {
        return (1 - Math.pow(1 - t, 2)) / d*c + b;
    }
};


class Pipe
{
    constructor()
    {
        this.pos = {x: 0, y: 0};
        this.drawPipeType =
        {
            top: function(pos)
            {
                ctx.drawImage(
                    image,
                    433, 108,
                    77, 480,
                    pos.x, pos.y,
                    77, 480
                );
            },

            bottom: function(pos)
            {
                ctx.drawImage(
                    image,
                    510, 108,
                    77, 480,
                    pos.x, pos.y,
                    77, 480
                );
            }
        };
    }
}

const background = new Background();
const bird = new Bird();

window.onload = () =>
{
    background.drawBackgound();
    background.move();
    bird.init();
};