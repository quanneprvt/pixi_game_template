class GameDefine
{
    constructor()
    {
        let n = 0;
        this.GAME_STATE_PRELOAD             = n++;
        this.GAME_STATE_LOADING             = n++;
        this.GAME_STATE_INGAME              = n++;
        this.GAME_STATE_RESULT              = n++;
        this.GAME_STATE_REGISTRATION        = n++;
        this.GAME_STATE_LEADERBOARD         = n++;
    }
}

module.exports = new GameDefine();