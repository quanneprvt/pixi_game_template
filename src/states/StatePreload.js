const BaseState = require('./BaseState');
const View = require('../views/StatePreloadView');
const APP = require('../app');
const StateManager = require('./StateManager');

class StatePreload extends BaseState
{
    constructor()
    {
        super();
        // console.log(new StateManager);
        //
        this.mView = new View();
    }

    Prelease()
    {
        APP.stage.addChild(this.mView);
        if (!this.mIsFirstInit)
        {
            this.mIsFirstInit = true;
            //
            let assets = [];
            //
            Utils.LoadAssets(assets, this.LoadCompleteHandler.bind(this), this.LoadProgressHandler.bind(this), this.LoadErrorhandler.bind(this));
        }
        else
        {
            this.mView.Init();
        }
    }

    Release()
    {
        APP.stage.removeChild(this.mView);
        // this.SetTouchable(false);
    }

    Init()
    {
        // PIXI.loader.removeAllListeners();
        // PIXI.loader.reset();
    }

    LoadProgressHandler(loader, res)
    {

    }

    LoadCompleteHandler(loader, res) 
    {
        this.mView.SetResources(loader.resources);
        this.mView.Init();

        // console.log(StateManager);
        // console.log(APP);
        console.log('switch');
        StateManager.SwitchState(GameDefine.GAME_STATE_LOADING, true);
        // loader.removeAllListeners();
        // this.SetTouchable(true);
    }

    LoadErrorhandler(loader, res) 
    {

    }
}

module.exports = StatePreload;