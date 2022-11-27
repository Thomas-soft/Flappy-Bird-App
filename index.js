const image = new Image();
image.src = "./assets/img/flappy-bird-set.png";

const canvas = document.querySelector("canvas");
const rectCanvas = canvas.getBoundingClientRect();
ctx = canvas.getContext("2d");

function drawBackgound()
{
    ctx.drawImage(
        image,
        0, 0,
        433, 768,
        0, 0,
        rectCanvas.width, rectCanvas.height
    );
}

class Flappy
{
    constructor()
    {
        this.pos = {x: 0, y: 0};
        this.size = {w: 50, h: 36};
        // this.rotation = 0;
        this.drawFlappyType =
        {
            down: function(pos)
            {
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

        this.drawFlappyType.fly(this.pos);
    }
}

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

let flappy = new Flappy();

window.onload = () =>
{
    drawBackgound();
    flappy.init();
};