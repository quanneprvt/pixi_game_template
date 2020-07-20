class Utils
{
    constructor()
    {

    }

    AddText(obj,text,style)
    {
        obj.text = new PIXI.Text(text,style);
        obj.text.anchor.set(0.5,0.5);
        obj.text.x += 0.5*obj.width;
        obj.text.y += 0.5*obj.height;
        obj.addChild(obj.text);
    }

    Distance2Point(p1, p2)
    {
        let a = p1.x - p2.x;
        let b = p1.y - p2.y;

        return Math.sqrt( a*a + b*b );
    }

    Angle2Point(p1, p2)
    {
        // angle in radians
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    DrawCircle(x,y,r)
    {
        let graph = new PIXI.Graphics();
            graph   .beginFill(0xffffff, 1)
                    .drawCircle(x, y, r);
        return graph;
    }

    DrawRect(rect)
    {
        let g = new PIXI.Graphics();
        g   .beginFill(0x000000, 0.8)
            .drawRect(rect.x, rect.y, rect.width, rect.height)
            .endFill();
        return g;
    }

    DrawBezier(arrP)
    {
        let graph = new PIXI.Graphics();
        graph.lineStyle(2,0xffffff);
        graph.moveTo(0,0);
        graph.bezierCurveTo(arrP[1].x - arrP[0].x, arrP[1].y - arrP[0].y, 
                            arrP[2].x - arrP[0].x, arrP[2].y - arrP[0].y, 
                            arrP[3].x - arrP[0].x, arrP[3].y - arrP[0].y);
        return graph;
    }

    RandInt(a, b)
    {
        return Math.floor(Math.random() * (1 + b - a)) + a;
    }

    Rand(a, b)
    {
        return Math.random() * (b - a) + a;
    }

    NumberRange(num, min = 0, max = 100) {
        const MIN = min;
        const MAX = max;
        const parsed = num;
        return Math.min(Math.max(parsed, MIN), MAX);
    }

    CollisionRectCircle(rect, circle)
    {
        var distX = Math.abs(circle.x - rect.x - rect.width / 2);
        var distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.height / 2 + circle.r)) {
            return false;
        }

        if (distX <= (rect.width / 2)) {
            return true;
        }
        if (distY <= (rect.height / 2)) {
            return true;
        }

        var dx = distX - rect.width / 2;
        var dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }

    Collision2Rect(r1, r2) {
        return !(
            ((r1.y + r1.height) < r2.y) ||
            (r1.y > (r2.y + r2.height)) ||
            ((r1.x + r1.width) < r2.x) ||
            (r1.x > (r2.x + r2.width))
        );
    }

    BezierPoint(t, array, i1 = 0, i2 = array.length - 1)
    {
        var length = i2 - i1 + 1;
        if(length > 2)
        {
            return (1 - t)*this.BezierPoint(t, array, i1, i2-1) + t*this.BezierPoint(t, array, i1+1, i2);
        }
        else if(length >= 2)
        {
            return (1 - t)*array[i1] + t*array[i2];
        }
        else if(length >= 1)
        {
            return array[i1];
        }
        else
        {
            return null;
        }
    }

    GetAssetUrl(url)
    {
        let asset = require("../assets/" + url);
        return asset.default;
    }

    LoadAssets(assets, success = function () {}, progress = function (){}, failed = function (){})
    {
        // const loader = new PIXI.Loader();
        const loader = PIXI.Loader.shared;
        if (assets.length == 0)
        {
            success(loader, loader.resources);
            return;
        }
        for (let i = 0; i < assets.length; i++)
        {
            loader.add(assets[i].name, assets[i].url);
        }
        loader.off('complete');
        loader.off('progress');
        loader.off('error');
        loader.load((loader, res) => {});
        loader.on('complete', success);
        loader.on('progress', progress);
        loader.on('error', failed);
    }

    //TODO: complete this font loader functionvar request = new XMLHttpRequest();
    // var request = new XMLHttpRequest();
    // request.addEventListener('readystatechange', function (e) {
    //     if (request.readyState == 2 && request.status == 200) {
    //         // Download is being started
    //     } else if (request.readyState == 3) {
    //         // Download is under progress
    //     } else if (request.readyState == 4) {
    //         // Downloading has finished

    //         // request.response holds the binary data of the font

    //         var junction_font = new FontFace('Junction Regular', request.response);
    //         junction_font.load().then(function (loaded_face) {
    //             document.fonts.add(loaded_face);
    //             document.body.style.fontFamily = '"Junction Regular", Arial';
    //         }).catch(function (error) {
    //             // error occurred
    //         });
    //     }
    // });

    // request.addEventListener('progress', function (e) {
    //     var percent_complete = (e.loaded / e.total) * 100;
    //     console.log(percent_complete);
    // });

    // request.responseType = 'arraybuffer';

    // // Downloading a font from the path
    // request.open('get', 'fonts/junction-regular.woff');

    // request.send();
}

module.exports = new Utils();