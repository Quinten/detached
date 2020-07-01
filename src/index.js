let sprite = ({
    x = 0,
    y = 0
} = {}) => {
    let draw = _ => {
        c.fillRect(x - 16, y - 16, 32, 32);
    };
    return {set x(_x){x=_x}, get x(){return x}, y, draw};
};
let player = sprite({x : innerWidth / 2, y: innerHeight / 2});
let {x, y} = player;
console.log(x);
setInterval(() => {
    player.x++;
    player.draw();
}, 17);
