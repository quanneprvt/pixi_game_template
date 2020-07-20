const BaseView = require('./BaseView');

class StateIngameView extends BaseView {
    constructor() {
        super();
        //
        this.mBackground = new PIXI.Container();
        this.mForeground = new PIXI.Container();
        this.mLoadingUI = new PIXI.Container();
        //
        this.addChild(this.mLoadingUI);
        this.addChild(this.mBackground);
        this.addChild(this.mForeground);
        //
        this.mBackgroundImage = null;
        this.mShootCounter = null;
        this.mGoalCounter = null;
        this.mLeftChance = 10;
        this.mScoredGoal = 0;
        //loading
        this.mLoadingBg = null;
        this.mLoadingCircle = null;
        this.mLoadingProgressText = null;
        this.mLoadingProgress = 0;
    }

    Init() 
    {
        if (!this.mIsFirstInit)
        {
            this.mIsFirstInit = true;
            this.mBackgroundImage = new PIXI.Sprite(this.mResources.ingameBackground.texture);
            this.mBackgroundImage.anchor.set(0.5);
            this.mShootCounter = new PIXI.Sprite();
            this.mShootCounter.addText(this.mLeftChance + '');
            this.mGoalCounter = new PIXI.Sprite();
            this.mGoalCounter.addText(this.mScoredGoal + '');
            //
            this.mBackground.addChild(this.mBackgroundImage);
            this.mForeground.addChild(this.mShootCounter);
            this.mForeground.addChild(this.mGoalCounter);
            //
            this.Positioning();
            this.SetTouchable(true);
            this.EventHandler();
            this.removeChild(this.mLoadingUI);
        }
        else
        {
            this.mLeftChance = 10;
            this.mScoredGoal = 0;
            this.mShootCounter.textContainer[0].text = this.mLeftChance + '';
            this.mGoalCounter.textContainer[0].text = this.mScoredGoal + '';
        }
    }

    AddLoadingUI(loader)
    {
        this.mLoadingBg = new PIXI.Sprite(loader.resources.loadingBg.texture);
        this.mLoadingBg.anchor.set(0.5);
        this.mLoadingBg.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight());
        this.mLoadingCircle = new PIXI.Sprite(loader.resources.loadingCircle.texture);
        this.mLoadingCircle.anchor.set(0.5);
        this.mLoadingCircle.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight() + 100);
        this.mLoadingProgressText = new PIXI.Sprite();
        this.mLoadingProgressText.anchor.set(0.5);
        this.mLoadingProgressText.addText('0 %', {fill: 0xffffff});
        this.mLoadingProgressText.position.set(0.5 * APP.GetWidth(), 0.5 * APP.GetHeight() + 175);
        //
        this.mLoadingUI.addChild(this.mLoadingBg);
        this.mLoadingUI.addChild(this.mLoadingCircle);
        this.mLoadingUI.addChild(this.mLoadingProgressText);
        this.SetTouchable(true);
    }

    SetLoadingProgress(p)
    {
        this.mLoadingProgress = Math.round(p);
    }

    Positioning() 
    {
        this.mBackgroundImage.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight());
        this.mShootCounter.position.set(20, 20);
        this.mGoalCounter.position.set(APP.GetWidth() - 20, 20);
    }

    Update(dt)
    {
        if (this.mLoadingCircle)
            this.mLoadingCircle.rotation += 2*dt;
        this.mLoadingProgressText.textContainer[0].text = this.mLoadingProgress + " %";
    }

    EventHandler(event)
    {
        EventManager.subscribe(EventDefine.EVENT_PLAYER_BALL_SHOOTED, function () {
            this.mLeftChance -= 1;
            this.mShootCounter.textContainer[0].text = this.mLeftChance + '';
            if (this.mLeftChance <= 0)
                EventManager.publish(EventDefine.EVENT_PLAYER_OUT_OF_CHANCE, {});
        }.bind(this));
        EventManager.subscribe(EventDefine.EVENT_PLAYER_SCORE_SUCCESS, function () {
            this.mScoredGoal += 1;
            this.mGoalCounter.textContainer[0].text = this.mScoredGoal + '';
        }.bind(this));
        EventManager.subscribe(EventDefine.EVENT_GAME_PLAY_FINISH, function () {
            EventManager.publish(EventDefine.EVENT_GAME_CHANGE_TO_RESULT, {score: this.mScoredGoal});
        }.bind(this));
    }

    TouchHandler(event) 
    {
        switch (event.type) {
            case 'mousedown':
            break;

            case 'mousemove':
                EventManager.publish(EventDefine.EVENT_PLAYER_ON_MOVE, event);
            break;
            
            case 'mouseup':
                if (event.target == this) 
                {
                    EventManager.publish(EventDefine.EVENT_PLAYER_ON_RELEASE, event);
                }
            break;
        }
    }
}

module.exports = StateIngameView;