import _ from 'lodash';
import './style.css';
require.context('./assets/', true, /\.(png|svg|jpg|gif)$/);
//
if (process.env.NODE_ENV !== 'production') 
{
    console.warn('Looks like we are in development mode!');
}
else
{
    console.warn("Now we're in production mode ");
    console.log = function(){};
}

//
global.PIXI = require('pixi.js');
global.Utils = require('./core/Utils');
global.GameDefine = require('./game/GameDefine');
global.EventDefine = require('./events/EventDefine');
global.Override = require('./core/Override');

function component() 
{
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}
//
document.body.appendChild(component());
//
(function() {

    var APP = require('./app');
    var StateManager = require('./states/StateManager');

    var states = [
        new (require('./states/StatePreload')),
        new (require('./states/StateLoading'))
    ];
    document.body.appendChild(APP.view);
    //
    StateManager.AddState(states);
    //
    APP.Init();
    StateManager.Init();
    
}());