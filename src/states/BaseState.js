const View = require('../views/BaseView');

class BaseState extends PIXI.Container
{
    // StateManager = StateManager;
    constructor()
    {
        super();
        this.mView = new View();
        this.isFadeComplete = true;
        this.mIsFirstInit = false;
    }

    Resume()
    {
        super.Resume();
    }

    Pause()
    {
        super.Pause();
    }

    FadeOut(dt)
    {
        this.alpha = Math.max(0, this.alpha -= 2*dt);
        if (this.alpha == 0)
            this.isFadeComplete = true;
        else
            this.isFadeComplete = false;
    }

    FadeIn(dt)
    {
        this.alpha = Math.min(1, this.alpha += 2*dt);
        if (this.alpha == 1)
            this.isFadeComplete = true;
        else
            this.isFadeComplete = false;
    }

    Update(dt)
    {

    }

    Prelease()
    {

    }

    Release()
    {
        console.log('fsfsfsd');
    }
}

module.exports = BaseState;