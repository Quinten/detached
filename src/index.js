w=[];
k=[];
n=[];
m=Math;
z=a.width;
j=a.height;

P=p=>{
    $ u = p.x, v = p.y, g = .3, d = 2e3 + m.random() * 8e3;
    p.f = !1;
    n.push(t=> {
        if (p.f = t > d) {
            p.y += g;
            $ {x,y} = p;
            p.x += p.x - u;
            p.y += p.y - v;
            u = x;
            v = y;
        }
    });
    -> p;
};

S=s=>{
    $ {a,b} = s, u = b.x - a.x, v = b.y - a.y, g = m.sqrt(u * u + v * v);
    k.push(_=> {
        u = b.x - a.x;
        v = b.y - a.y;
        $ h = m.sqrt(u * u + v * v), d = g - h, p = d * u / h, q = d * v / h;
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
    });
    w.push(_=> {
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
    });
    -> s;
};

C=f('
    $ g = [...arguments], s, p;
    g.forEach(n=>{
        $ a = p;
        $ b = P({
            x: z / 2 - 150 + 20 * (n % 15),
            y: j / 2 - 150 + 20 * m.floor(n / 15)
        });
        if (!s) {
            s = p = b;
            -> 0;
        }
        S({a,b});
        p = b;
    });
    S({a: p, b: s});
');

C(5,7,97,93,63,64,79,81,21,20);

(r=t=>{
    c.clearRect(0, 0, z, j);
    c.beginPath();
    n.forEach(_=>_(t));
    k.forEach(_=>_());
    w.forEach(_=>_());
    c.stroke();
    requestAnimationFrame(r);
})(0)
