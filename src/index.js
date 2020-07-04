point=p=>{
    $ u = p.x, v = p.y, g = .3;
    p.f = !0;
    p.n = _=> {
        if (p.f) {
            p.y += g;
            $ {x,y} = p;
            p.x += p.x - u;
            p.y += p.y - v;
            u = x;
            v = y;
        }
    };
    -> p;
};

stick=s=>{
    $ {a,b} = s;
    $ u = b.x - a.y;
    $ v = b.y - a.y;
    $ g = Math.sqrt(u * u + v * v);
    s.n = _=> {
        u = b.x - a.x;
        v = b.y - a.y;
        $ h = Math.sqrt(u * u + v * v);
        $ d = g - h;
        $ p = d * u / h;
        $ q = d * v / h;
        if (a.f && b.f) {
            a.x -= p/2;
            a.y -= q/2;
            b.x += p/2;
            b.y += q/2;
            -> 0;
        }
        if (a.f && !b.f) {
            a.x -= p;
            a.y -= q;
            -> 0;
        }
        if (!a.f && b.f) {
            b.x += p;
            b.y += q;
        }
    };
    s.d = _=> {
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
    };
    -> s;
};

pA = point({x: 100, y: 100});
pB = point({x: 200, y: 200});
pB.f = !1;
sA = stick({a: pA, b: pB});
(r=_=>{
    c.clearRect(0, 0, a.width, a.height);
    pA.n();
    pB.n();
    c.beginPath();
    sA.n();
    sA.d();
    c.stroke();
    requestAnimationFrame(r);
})()
