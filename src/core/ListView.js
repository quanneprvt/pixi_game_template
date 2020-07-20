var fakeData = [
    {name: 'Quan', age: 25, score: 10000},
    {name: 'Thu', age: 31, score: 50},
    {name: 'Van', age: 27, score: 100},
    {name: 'Quan', age: 25, score: 10000},
    {name: 'Thu', age: 31, score: 50},
    {name: 'Van', age: 27, score: 100},
    {name: 'Quan', age: 25, score: 10000},
    {name: 'Thu', age: 31, score: 50},
    {name: 'Van', age: 27, score: 100},
    {name: 'Quan', age: 25, score: 10000},
    {name: 'Thu', age: 31, score: 50},
    {name: 'Van', age: 27, score: 100},
    {name: 'Quan', age: 25, score: 10000},
    {name: 'Thu', age: 31, score: 50},
    {name: 'Van', age: 27, score: 100},
];

class ListView extends PIXI.Container
{
    constructor(data)
    {
        super();
        this.data = data;
        this.columnWidth = [100,100, 100];
        this.rowHeight = 60;
        this.isHold = false;
        this.mPos = {x: 0, y: 0};
        this.mOriginPosition = {x: 0, y: 0};
        this.mOriginMousePosition = {x: 0, y: 0};
        this.mMousePosition = {x: 0, y: 0};
        this.mStartPosition = {x:0, y:0};
        //
        this.mState = null;
        let n = 0;
        this.STATE= {
            NORMAL: n++,
            SCROLL: n++
        };
        //debug
        this.data = fakeData;
    }

    Init()
    {
        for (let i = 0; i< this.data.length; i++)
        {
            let d = new PIXI.Sprite();
            let c = 0;
            for (let a in this.data[i])
            {
                let t = d.addText(this.data[i][a]);
                // let textMetrics = PIXI.TextMetrics.measureText(d.textContainer[c].text, d.textContainer[c].style);
                t.position.x += 0.5*this.columnWidth[c];
                if (c != 0)
                {
                    for (let j = 0; j< c; j++)
                        t.position.x += this.columnWidth[j];
                }
                c++;
            }
            d.position.y += this.rowHeight * i;
            d.position.y += 0.5*this.rowHeight;
            this.addChild(d);
        }
        this._SetState(this.STATE.NORMAL);
    }

    GetRect()
    {
        return {
            x: this.position.x, 
            y: this.position.y, 
            width: this.width, 
            height: this.height
        };
    }

    SetStartPosition(p)
    {
        this.mStartPosition = p;
    }

    Update(dt)
    {
        switch (this.mState) {
            case this.STATE.SCROLL:
                if (!this.isHold)
                {
                    if (Math.round(this.mPos.y) > this.mStartPosition.y)
                    {
                        // console.log(this.mPos.y, this.mStartPosition.y);
                        this.mPos.y += 6*(this.mStartPosition.y - this.mPos.y)*dt;
                        if (Math.abs(this.mStartPosition.y - this.mPos.y) <= 1)
                            this._SetState(this.STATE.NORMAL);
                    }
                    if (Math.round(this.mPos.y) < this.mStartPosition.y - this.height + this.mask.height - 0.5 * this.rowHeight)
                    {
                        this.mPos.y += 6*((this.mStartPosition.y - this.height + this.mask.height - 0.5 * this.rowHeight) - this.mPos.y)*dt;
                        if (Math.abs(this.mStartPosition.y - this.height + this.mask.height - 0.5 * this.rowHeight - this.mPos.y) <= 1)
                            this._SetState(this.STATE.NORMAL);
                    }
                    this.position.set(this.position.x, this.mPos.y);
                }
            break;

            case this.STATE.NORMAL:
            break;
        }
    }

    TouchHandler(event)
    {
        switch (event.type) {
            case 'mousedown':
                this.isHold = true;
                this.mOriginPosition = {x: this.position.x, y: this.position.y};
                this.mOriginMousePosition = {x: event.data.global.x, y: event.data.global.y};
            break;

            case 'mousemove':
                if (this.isHold)
                {
                    this.mMousePosition = {x: event.data.global.x, y: event.data.global.y};
                    // this.mPos.y = this.mOriginPosition.y + (this.mMousePosition.y - this.mOriginMousePosition.y);
                    let pos = this.mOriginPosition.y + (this.mMousePosition.y - this.mOriginMousePosition.y);
                    let upperLimit = this.mStartPosition.x;
                    let lowerLimit = this.mStartPosition.y - this.height + this.mask.height - 0.5 * this.rowHeight;
                    this.mPos.y = Utils.NumberRange(pos, lowerLimit - 150, upperLimit + 150);
                    //
                    this.position.set(this.position.x, this.mPos.y);
                }
            break;

            case 'mouseup':
                if (this.mPos.y > this.mStartPosition.x
                    || this.mPos.y < this.mStartPosition.y - this.height + this.mask.height - 0.5 * this.rowHeight)
                {
                    this._SetState(this.STATE.SCROLL);
                }
                this.isHold = false;
                this.mOriginPosition = {x: 0, y: 0};
                this.mOriginMousePosition = {x: 0, y: 0};
                this.mMousePosition = {x: 0, y: 0};
            break;
        }
    }

    //PRIVATE FUNCTION
    _SetState(s)
    {
        this.mState = s;
        switch (s) {
            case this.STATE.NORMAL:
            break;

            case this.STATE.SCROLL:
            break;
        }
    }
}

module.exports = ListView;