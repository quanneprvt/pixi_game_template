const BaseView = require('./BaseView');

class StatePreloadView extends BaseView
{
    constructor()
    {
        super();
        //
        this.mBackground = new PIXI.Container();
        this.mForeground = new PIXI.Container();
        //
        this.addChild(this.mBackground);
        this.addChild(this.mForeground);
    }

    Init()
    {
        if (!this.mIsFirstInit)
        {
            this.mIsFirstInit = true;
            //
            this.Positioning();
        }
    }

    Positioning()
    {

    }

    TouchHandler(event)
    {
        // console.log(event);
        switch (event.target) {
        }
    }
}

module.exports = StatePreloadView;