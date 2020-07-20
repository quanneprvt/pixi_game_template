const BaseState = require('./BaseState');
const View = require('../views/StatePreloadView');
const APP = require('../app');
const StateManager = require('./StateManager');
const EventManager = require('../events/EventManager');

class StateLoading extends BaseState
{
    constructor()
    {
        super();
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
        console.log('switch success');
        // EventManager.publish(EventDefine.STATE_LOADING_COMPLETE, {});
        // loader.removeAllListeners();
        // this.SetTouchable(true);
    }

    LoadErrorhandler(loader, res) 
    {

    }
}

module.exports = StateLoading;