class Override
{
    constructor()
    {
        PIXI.Sprite.prototype.addText = function(text, style = {})
        {
            this.textContainer = this.textContainer ? this.textContainer : [];
            let t = new PIXI.Text(text, style);
            // this.textContainer = new PIXI.Text(text, style);
            t.anchor.set(0.5, 0.5);
            this.textContainer.push(t);
            this.addChild(t);
            return t;
        }

        PIXI.Sprite.prototype.SetTouchable = function(i = false)
        {
            this.interactive = i;
            this.buttonMode = i;
        }

        PIXI.Container.prototype.SetTouchable = function(i = false)
        {
            this.interactive = true;
            switch (i)
            {
                case true: 
                    this.hitArea = new PIXI.Rectangle(0,0, this.width, this.height);
                    this
                        // set the mousedown and touchstart callback...
                        .on('mousedown', this.TouchHandler)
                        .on('touchstart', this.TouchHandler)
                        .on('mousemove', this.TouchHandler)

                        // set the mouseup and touchend callback...
                        .on('mouseup', this.TouchHandler)
                        .on('touchend', this.TouchHandler)
                break;

                case false:
                    this.hitArea = null;
                    this.removeAllListeners();
                break;
            }
        }
    }
}

module.exports = new Override();
