w=[];
k=[];
n=[];
m=Math;
z=a.width;
j=a.height;

// point constructor
P = p =>{
    let u = p.x, // previous x position, used to calculate velocity
        v = p.y,
        d = 1e3 + m.random() * 17e3; // detach point after d millieseconds

    // apply gravity and update positions
    n.push( t => {

        if (p.f = t > d) { // is it detached?
            p.y += .3;
            let {x,y} = p;
            p.x += p.x - u;
            p.y += p.y - v;
            u = x;
            v = y;
        }
    });

    return p;
};

// stick contructor
S = (a, b) => {

    let u = b.x - a.x,
        v = b.y - a.y,
        g = m.sqrt(u * u + v * v); // original length of the stick

    // brings the points back together
    k.push(_=> {

        u = b.x - a.x;
        v = b.y - a.y;

        let h = m.sqrt(u * u + v * v),
            d = g - h,
            p = d * u / h,
            q = d * v / h;

        if (a.f && b.f) { // both detached
            a.x -= p/2;
            a.y -= q/2;
            b.x += p/2;
            b.y += q/2;
        } else if (a.f && !b.f) { // a is detached
            a.x -= p;
            a.y -= q;
        } else if (!a.f && b.f) { // b is detached
            b.x += p;
            b.y += q;
        }
    });

    // draws the stick
    w.push(_=> {
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
    });
};

// character constructor creates points and sticks from positions represented by numbers
C = (...g) => {

    let s, p; // remember start and previous point

    // loop over the numbers
    g.forEach( n => {

        let a = p,

            // point from number
            b = P({
                x: z / 2 - 150 + 20 * (n % 15),
                y: j / 2 - 150 + 20 * m.floor(n / 15)
        });
        if (!s) {
            s = p = b;
            return;
        }

        // stick from 2 points
        S(a, b);

        p = b;
    });

    // close path
    S(p, s);
};

// the letter J
C(5,7,97,93,63,64,79,81,21,20);

// the letter s
C(8,11,26,24,39,42,102,98,68,69,84,86,56,53);

// the number 1
C(105,107,182,183,198,195,180,181,121,120);

// the number 0
C(109,112,202,199);
C(125,126,186,185);

// the number 2
C(113,116,176,174,189,191,206,203,158,160,130,129,144,143);

// the number 4
C(117,118,163,164,119,119.9,209.9,209,179,177);

// render animation or reload
(r=t=>{
    R=false;
    c.clearRect(0, 0, z, j);
    c.beginPath();
    n.forEach(_=>_(t));
    k.forEach(_=>_());
    w.forEach(_=>_());
    c.stroke();
    (t < 2e4) ? requestAnimationFrame(r) : location.reload();
})(0)
