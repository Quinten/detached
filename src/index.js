point<{
    $ {x, y} = p;
    $ u = x, v = y, i = !0, t = 1;
    $ vx = _=> x - u;
    $ vy = _=> y - v;
    $ n = _=> {
        if (i) {
            y += t;
            $ tx = x, ty = y;
            x += vx();
            y += vy();
            u = tx;
            v = ty;
        }
        c.fillRect(x, y, 12, 12);
        -> y;
    };
    -> {x,y,i,n};
}>

myPoint = point({x: a.width / 2, y: 0});
console.log(myPoint);
setInterval(()=>{c.clearRect(0, 0, a.width, a.height); myPoint.n();}, 17);
