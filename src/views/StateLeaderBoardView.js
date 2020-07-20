const BaseView = require('./BaseView');
const ListView = require('../core/ListView');

class StateLeaderBoardView extends BaseView {
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
        this.mHomeBtn = null;
        this.mListPlayer = null;
    }

    Init() 
    {
        if (!this.mIsFirstInit)
        {
            this.mIsFirstInit = true;
            this.mBackgroundImage = new PIXI.Sprite(this.mResources.leaderboardBg.texture);
            this.mBackgroundImage.anchor.set(0.5);
            this.mHomeBtn = new PIXI.Sprite(this.mResources.button.texture);
            this.mHomeBtn.anchor.set(0.5);
            this.mListPlayer = new ListView();
            //
            this.mListPlayer.Init();
            this.mListPlayer.SetTouchable(true);
            this.mHomeBtn.addText("Home");
            this.mHomeBtn.SetTouchable(true);
            //
            this.mBackground.addChild(this.mBackgroundImage);
            this.mForeground.addChild(this.mListPlayer);
            this.mForeground.addChild(this.mHomeBtn);
            //
            this.Positioning();
            this.Adjusting();
            this.SetTouchable(true);
        }
    }

    Positioning() 
    {
        this.mBackgroundImage.position.set(0.5 * APP.GetWidth(), 0.5 * APP.GetHeight());
        this.mHomeBtn.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight() + 370);
        this.mListPlayer.position.set(0.5*APP.GetWidth() - 0.5*this.mListPlayer.width, 0.5*APP.GetHeight() - 230);
        this.mListPlayer.SetStartPosition({x: 0.5*APP.GetWidth() - 0.5*this.mListPlayer.width, y: 0.5*APP.GetHeight() - 230});
    }

    Adjusting()
    {
        let rect = this.mListPlayer.GetRect();
        rect.height = 500;
        this.mListPlayer.mask = Utils.DrawRect(rect);
    }

    Update(dt)
    {
        if (this.mListPlayer)
            this.mListPlayer.Update(dt);
    }

    TouchHandler(event) {
        switch (event.target) {
            case this.mHomeBtn:
                if (event.type == 'mouseup')
                {
                    StateManager.SwitchState(GameDefine.GAME_STATE_PRELOAD, true);
                    if (!this.mHomeBtn.interactive)
                        this.mHomeBtn.SetTouchable(true);
                }
            break;

            case this.mListPlayer:
                if (event.type == 'mousedown')
                    this.mHomeBtn.SetTouchable(false);
                if (event.type == 'mouseup')
                    this.mHomeBtn.SetTouchable(true);
                this.mListPlayer.TouchHandler(event);
            break;

            case this:
                if (event.type == 'mouseup')
                {
                    this.mHomeBtn.SetTouchable(true);
                    this.mListPlayer.TouchHandler(event);
                }
            break;
        }
    }
}

module.exports = StateLeaderBoardView;