class Application extends PIXI.Application
{
    constructor()
    {
        super();
        this.width = 825;
        this.height = 550;
        this.renderer.resize(this.width, this.height);
        this.test_id = Math.random();
    }

    Public()
    {
        let instance = {};
        instance = this;
        return instance;
    }

    Init()
    {
        this.ticker.add(() => {
            let deltaTime = this.ticker.elapsedMS/1000;
        });
    }

    GetWidth()
    {
        return this.width;
    }

    GetHeight()
    {
        return this.height;
    }
}

module.exports = new Application();