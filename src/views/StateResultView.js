const BaseView = require('./BaseView');

class StateResultView extends BaseView {
    constructor() {
        super();
        //
        this.mBackground = new PIXI.Container();
        this.mForeground = new PIXI.Container();
        //
        this.addChild(this.mBackground);
        this.addChild(this.mForeground);
        //
        this.mBackgroundImage = null;
        this.mWellDoneText = null;
        this.mContinueBtn = null;
        this.mScoreBg = null;
        this.mScoreTitleText = null;
        this.mScoreText = null;
        this.mScore = 0;
        EventManager.subscribe(EventDefine.EVENT_GAME_CHANGE_TO_RESULT, function(data){ this.mScore = data.score; }.bind(this));
    }

    Init() 
    {
        if (!this.mIsFirstInit)
        {
            this.mIsFirstInit = true;
            this.mBackgroundImage = new PIXI.Sprite(this.mResources.background.texture);
            this.mBackgroundImage.anchor.set(0.5);
            this.mWellDoneText = new PIXI.Sprite(this.mResources.welldoneText.texture);
            this.mWellDoneText.anchor.set(0.5);
            this.mContinueBtn = new PIXI.Sprite(this.mResources.button.texture);
            this.mContinueBtn.anchor.set(0.5);
            this.mScoreBg = new PIXI.Sprite(this.mResources.popupBg.texture);
            this.mScoreBg.anchor.set(0.5);
            this.mScoreTitleText = new PIXI.Sprite();
            this.mScoreTitleText.anchor.set(0.5);
            this.mScoreText = new PIXI.Sprite();
            this.mScoreText.anchor.set(0.5);
            //
            this.mContinueBtn.addText("Continue");
            this.mContinueBtn.SetTouchable(true);
            this.mScoreTitleText.addText("Number of Goal Scored");
            this.mScoreText.addText(this.mScore + "");
            //
            this.mBackground.addChild(this.mBackgroundImage);
            this.mBackground.addChild(this.mWellDoneText);
            this.mForeground.addChild(this.mContinueBtn);
            this.mForeground.addChild(this.mScoreBg);
            this.mForeground.addChild(this.mScoreTitleText);
            this.mForeground.addChild(this.mScoreText);
            //
            this.Positioning();
            this.SetTouchable(true);
        }
        else
        {
            console.log(this.mScore);
            this.mScoreText.textContainer[0].text = this.mScore;
        }
    }

    Positioning() {
        this.mBackgroundImage.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight());
        this.mWellDoneText.position.set(0.5*APP.GetWidth(), 0.5*APP.GetWidth() - 150);
        this.mContinueBtn.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight() + 300);
        this.mScoreBg.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight() + 37.5);
        this.mScoreTitleText.position.set(this.mScoreBg.position.x, this.mScoreBg.position.y - 0.5*this.mScoreBg.height + this.mScoreTitleText.textContainer[0].height + 50);
        this.mScoreText.position.set(this.mScoreBg.position.x, this.mScoreBg.position.y + 0.5 * this.mScoreBg.height + this.mScoreText.textContainer[0].height - 100);
    }

    TouchHandler(event) {
        switch (event.target) {
            case this.mContinueBtn:
                if (event.type == 'mouseup')
                    StateManager.NextState(true);
            break;
        }
    }
}

module.exports = StateResultView;