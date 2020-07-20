const APP                   = require('../app');

class StateManager
{
    constructor()
    {
        this.isInstantiated = false;
        let n = 0;
        this.mState = null;
        this.STATE = {
            INIT: n++,
            RUN: n++,
            TRANSITION: n++,
            END: n++
        }
        this.mStateStack = [];
        this.mCurrentState;
        this.mNextState;
    }

    Init()
    {
        console.log('init');
        this._SetState(this.STATE.INIT);
    }

    Start()
    {
        this._SetState(this.STATE.RUN);
    }

    AddState(s)
    {
        if (Array.isArray(s))
            this.mStateStack.push(...s);
        else
            this.mStateStack.push(s);
    }

    RemoveState(s)
    {
        if (this.mStateStack[s])
            this.mStateStack.splice(this.mStateStack.indexOf(s), 1);
    }

    SwitchState(s, transition = false)
    {
        if (transition)
        {
            this.mNextState = s;
            this._SetState(this.STATE.TRANSITION);
            // console.log(this.mState);
            return;
        }
        if (this.mStateStack[s])
        {
            this.mStateStack[s].Release();
        }
        this.mCurrentState = this.mStateStack[s];
        // console.log(this.mCurrentState);
        this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].Prelease();
    }

    NextState(transition = false)
    {
        if (transition)
        {
            this.mNextState = this.mStateStack.indexOf(this.mCurrentState) + 1;
            this._SetState(this.STATE.TRANSITION);
            return;
        }
        this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].Release();
        this.mCurrentState = this.mStateStack[this.mNextState];
        this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].Prelease();
    }

    Pause()
    {
        this.mStateStack[this.mCurrentState].Pause();
    }

    Resume()
    {
        this.mStateStack[this.mCurrentState].Resume();
    }

    //Update Handler
    Update(dt)
    {
        // console.log(this.mCurrentState);
        if (this.mCurrentState)
            this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].Update(dt);
        switch (this.mState) 
        {
            case this.STATE.TRANSITION:
                if (!this.mCurrentState || this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].isFadeComplete)
                {
                    this._SetState(this.STATE.RUN);
                    // this.NextState(false);
                    this.SwitchState(this.mNextState, false);
                    this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].alpha = 0;
                }
                this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].FadeOut(dt);
            break;

            case this.STATE.RUN:
                this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].FadeIn(dt);
            break;
        }
    }

    //PRIVATE FUNCTION

    //State Handler
    _SetState(s)
    {
        this.mState = s;
        switch(this.mState)
        {
            case this.STATE.INIT:
                if (this.isInstantiated == false)
                {
                    // this.mStateStack = [];
                    this.mCurrentState = null;
                    APP.ticker.add(function() {
                        let deltaTime = APP.ticker.elapsedMS / 1000;
                        this.Update(deltaTime);
                    }.bind(this));
                    this.SwitchState(0, true);
                    // this._SetState(this.STATE.TRANSITION);
                }
                else
                    this.Start();
            break;

            case this.STATE.TRANSITION:
                // this.mStateStack[this.mStateStack.indexOf(this.mCurrentState)].Release();
            break;

            case this.STATE.RUN:
            break;

            case this.STATE.END:
            break;
        }
    }
}

module.exports = new StateManager();