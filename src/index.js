hello<{

$ {greet}=p;
$ {yololo='yoloyolo'}=p;
console.log(greet);
greet='that was it';
->{greet,yololo};

}>


world<{

console.log('constructor');

}>

console.log(hello({greet: 'howdy'}));
world();
