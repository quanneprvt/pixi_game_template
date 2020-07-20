const BaseView = require('./BaseView');
const TextInput = require("../libs/PIXI.TextInput.min.js");

class StateRegistrationView extends BaseView {
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
        this.mName = null;
        this.mEmail = null;
        this.mContinueBtn = null;
    }

    Init() {
        if (!this.mIsFirstInit)
        {
            this.mIsFirstInit = true;
            this.mBackgroundImage = new PIXI.Sprite(this.mResources.background.texture);
            this.mBackgroundImage.anchor.set(0.5);
            //
            this.mName = new PIXI.TextInput({
                input: {
                    fontSize: '20px',
                    padding: '10px',
                },
                box: {
                    default: {fill: 0xebbd34, rounded: 5, stroke: {color: 0xeb8f34, width: 2}},
                    focused: {fill: 0xebbd34, rounded: 5, stroke: {color: 0xeb8f34, width: 2}},
                    disabled: {fill: 0xDBDBDB, rounded: 5}
                }
            });
            let label = new PIXI.Sprite();
            label.addText("Name");
            label.position.set(0.5*label.textContainer[0].width, -0.5*this.mName.height);
            this.mName.placeholder = 'Enter your name';
            this.mName.focus();
            this.mName.substituteText = false;
            this.mName.addChild(label);
            this.mEmail = new PIXI.TextInput({
                input: {
                    fontSize: '20px',
                    padding: '10px',
                },
                box: {
                    default: {fill: 0xebbd34, rounded: 5, stroke: {color: 0xeb8f34, width: 2}},
                    focused: {fill: 0xebbd34, rounded: 5, stroke: {color: 0xeb8f34, width: 2}},
                    disabled: {fill: 0xDBDBDB, rounded: 5}
                }
            });
            label = new PIXI.Sprite();
            label.addText("Email");
            label.position.set(0.5 * label.textContainer[0].width, -0.5*this.mEmail.height);
            this.mEmail.placeholder = 'Enter your email';
            this.mEmail.focus();
            this.mEmail.substituteText = false;
            this.mEmail.addChild(label);
            //
            this.mContinueBtn = new PIXI.Sprite(this.mResources.button.texture);
            this.mContinueBtn.anchor.set(0.5);
            this.mContinueBtn.addText("Continue");
            this.mContinueBtn.SetTouchable(true);
            //
            this.addChild(this.mContinueBtn);
            this.addChild(this.mName);
            this.addChild(this.mEmail);
            this.mBackground.addChild(this.mBackgroundImage);
            //
            this.Positioning();
            this.SetTouchable(true);
        }
         this.mName.substituteText = false;
         this.mEmail.substituteText = false;
    }

    Positioning() {
        this.mBackgroundImage.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight());
        this.mName.position.set(0.5*APP.GetWidth() - 0.5*this.mName.width, 0.5*APP.GetHeight() - 75);
        this.mEmail.position.set(0.5 * APP.GetWidth() - 0.5 * this.mName.width, 0.5 * APP.GetHeight() + 75);
        this.mContinueBtn.position.set(0.5*APP.GetWidth(), 0.5*APP.GetHeight() + 250);
    }

    TouchHandler(event) {
        switch (event.target) {
            case this.mContinueBtn:
                if (event.type == 'mouseup')
                {
                    StateManager.NextState(true);
                    this.mName.substituteText = true;
                    this.mEmail.substituteText = true;
                }
            break;
        }
    }
}

module.exports = StateRegistrationView;