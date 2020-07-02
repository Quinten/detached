let sprite = ({
    x = 0,
    y = 0
} = {}) => {
    let draw = _ => {
        c.fillRect(x - 16, y - 16, 32, 32);
    };
    return {x: (_ = x) => x = _ , y, draw};
};
let pipo = sprite({x : a.width / 2, y: a.height / 2});
setInterval(() => {
    pipo.x(pipo.x() + 1);
    pipo.draw();
}, 17);

