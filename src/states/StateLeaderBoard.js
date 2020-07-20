const BaseState = require('./BaseState');
const View = require('../views/StateLeaderBoardView');

class StateLeaderBoard extends BaseState {
    constructor() {
        super();
        //
        this.mView = new View();
        this.mState;
        let n = 0;
        this.STATE = {
            INIT: n++,
            RUN: n++,
        };

        this.addChild(this.mView);
    }

    Prelease() {
        APP.stage.addChild(this);
        if (!this.mIsFirstInit) 
        {
            this.mIsFirstInit = true;
            //
            let assets = [];
            assets.push({name: "leaderboardBg", url: Utils.GetAssetUrl("leaderboardbg.jpg")});
            //
            Utils.LoadAssets(assets, this.LoadCompleteHandler.bind(this), this.LoadProgressHandler.bind(this), this.LoadErrorhandler.bind(this));
        }
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

    Start() {
        this._SetState(this.STATE.RUN);
    }

    Update(dt) {
        switch (this.mState) {
            case this.STATE.RUN:
                this.mView.Update(dt);
            break;
        }
    }

    LoadProgressHandler(loader, res) {

    }

    LoadCompleteHandler(loader, res) {
        this.mView.SetResources(loader.resources);
        this.mView.Init();
        this.Init();
        // loader.removeAllListeners();
    }

    LoadErrorhandler(loader, res) {

    }

    //PRIVATE FUNCTION
    _SetState(s) {
        this.mState = s;
        switch (s) {
            case this.STATE.INIT:
                this.Start();
                break;

            case this.STATE.RUN:
                break;
        }
    }
}

module.exports = StateLeaderBoard;