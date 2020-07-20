const BaseState = require('./BaseState');
const View = require('../views/StateResultView');

class StateResult extends BaseState {
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
            assets.push({name: "welldoneText", url: Utils.GetAssetUrl("welldone.png")});
            assets.push({name: "popupBg", url: Utils.GetAssetUrl("popupbg.png")});
            //
            Utils.LoadAssets(assets, this.LoadCompleteHandler.bind(this), this.LoadProgressHandler.bind(this), this.LoadErrorhandler.bind(this));
        }
        else
        {
            this.mView.Init();
        }

        // if (assets.length == 0)
        //     this.LoadCompleteHandler();
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
                break;
        }
    }

    LoadProgressHandler(loader, res) 
    {

    }

    LoadCompleteHandler(loader, res)
    {
        this.mView.SetResources(loader.resources);
        this.mView.Init();
        // loader.removeAllListeners();
    }

    LoadErrorhandler(loader, res) {

    }

    //PRIVATE FUNCTION
    _SetState(s) {
        this.mState = s;
        switch (s) {
            case this.STATE.INIT:
                
            break;

            case this.STATE.RUN:
                break;
        }
    }
}

module.exports = StateResult;