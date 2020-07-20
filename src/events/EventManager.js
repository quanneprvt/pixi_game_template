class EventManager 
{
    constructor() 
    {
        this.events = {};
        for (let a in EventDefine)
            this.events[a] = EventDefine[a];
    }

    subscribe(event, callback) 
    {
        const map = this.events[event] = this.events[event] || new Map;
        if (typeof callback === 'function')
        {
            map.set(callback);
        }
    }

    publish(event, data)
    {
        const map = this.events[event];
        if (map)
        {
            [...map].forEach(([cb]) => cb(data));
        }        
    }

    unsubscribe(event, callback) 
    {
        const map = this.events[event];
        if (map)
        {
            map.delete(callback);
        }
    }
}

module.exports = new EventManager();