const BaseState = require('./BaseState');
const View = require('../views/StateIngameView');
const GameMgr = require('../game/GameMgr');

class StateIngame extends BaseState {
    constructor() {
        super();
        //
        this.mView = new View();
        this.mGameMgr = new GameMgr();
        this.addChild(this.mView);
        this.addChild(this.mGameMgr);
        this.mState;
        let n = 0;
        this.STATE = {
            INIT: n++,
            RUN: n++,
        };
        this.mLoadingAssetLoaded = false;
    }

    Prelease() 
    {
        APP.stage.addChild(this);
        if (!this.mIsFirstInit) 
        {
            this.mIsFirstInit = true;
            this.mLoadingCounter = 0;
            //
            let assets = [];
            assets.push({name: "loadingBg", url: Utils.GetAssetUrl("loadingbg.jpg")});
            assets.push({name: "loadingCircle", url: Utils.GetAssetUrl("loadingcircle.png")});
            assets.push({name: "ingameBackground", url: Utils.GetAssetUrl("ingame.jpg")});
            assets.push({name: "playerBall", url: Utils.GetAssetUrl("ball.png")});
            assets.push({name: "goalNet", url: Utils.GetAssetUrl("goalnet.png")});
            assets.push({name: "ballShadow", url: Utils.GetAssetUrl("ballshadow.png")});
            //
            Utils.LoadAssets(assets, this.LoadCompleteHandler.bind(this), this.LoadProgressHandler.bind(this), this.LoadErrorhandler.bind(this));
        }
        else
            this.mView.Init();
    }

    Release() {
        APP.stage.removeChild(this);
        // this.SetTouchable(false);
    }

    Init() {
        // PIXI.loader.removeAllListeners();
        // PIXI.loader.reset();
        this._SetState(this.STATE.INIT);
    }

    Start()
    {
        this._SetState(this.STATE.RUN);
    }

    Update(dt)
    {
        switch (this.mState) {
            case this.STATE.RUN:
                this.mGameMgr.Update(dt);
            break;
        }
        if (this.alpha == 1)
            this.mView.Update(dt);
    }

    LoadProgressHandler(loader, res) 
    {
        switch (res.name) {
            case 'loadingBg':
                this.mLoadingCounter++;
            break;

            case 'loadingCircle':
                this.mLoadingCounter++;
            break;
        }

        if (this.mLoadingCounter == 2)
        {
            this.mView.AddLoadingUI(loader);
            this.mLoadingAssetLoaded = true;
        }
        if (this.mLoadingAssetLoaded)
        {
            this.mView.SetLoadingProgress(loader.progress);
        }
    }

    LoadCompleteHandler(loader, res) {
        setTimeout(function(){
            this.mView.SetResources(loader.resources);
            this.mGameMgr.SetResources(loader.resources);
            this.mView.Init();
            this.Init();
        }.bind(this), 1500);
        // loader.removeAllListeners();
    }

    LoadErrorhandler(loader, res) {

    }

    //PRIVATE FUNCTION
    _SetState(s)
    {
        this.mState = s;
        switch (s) {
            case this.STATE.INIT:
                this.mGameMgr.Init();
                this.Start();
                EventManager.subscribe(EventDefine.EVENT_GAME_CHANGE_TO_RESULT, function () {
                    StateManager.NextState(true);
                });
            break;

            case this.STATE.RUN:
                this.mGameMgr.Start();
            break;
        }
    }
}

module.exports = StateIngame;