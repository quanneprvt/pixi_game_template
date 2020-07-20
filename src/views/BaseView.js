class BaseView extends PIXI.Container
{
    constructor()
    {
        super();
        this.mResources = null;
        this.mIsFirstInit = false;
    }

    SetResources(r)
    {
        this.mResources =  r;
    }

    Positioning()
    {

    }

    TouchHandler()
    {
        console.log('base view touch handler');
    }
}

module.exports = BaseView;