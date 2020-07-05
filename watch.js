const fs = require('fs');
let Terser = require('terser');

// file watcher + compiler
// _______________________

const files = [
    'index.js'
];

const shim = fs.readFileSync('src/index.html', 'utf8');

const reload = `
let html;
setInterval(() => {
    fetch('index.html').then(response => response.text()).then(newHtml => { if (html && newHtml != html) { location.reload(); }; html = newHtml; });
}, 1000);
`;

fs.watchFile('./src', (curr, prev) => {

    console.log('Minify...');

    let origCode = '';
    files.forEach((filename) => {
        origCode += fs.readFileSync('src/' + filename, 'utf8');
    });

    let {code} = Terser.minify(origCode, {
        mangle: {
            toplevel: true,
            properties: true,
            reserved: ['a', 'b', 'c', 'd']
        }
    });

    console.log(code.length);

    fs.writeFileSync('public/entry.js', code);
    fs.writeFileSync('public/index.html', shim.replace('ENTRY_CODE', code + reload));

    console.log('Done!');
});

// server
// ______

const cwd = process.cwd() + '/public';
const http = require('http');
const path = require('path');

http.createServer(function (request, response) {

    var filePath = cwd + request.url;
    if (filePath == cwd + '/') {
        filePath = cwd + '/index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT'){
                response.writeHead(404);
                response.end();
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(4010);
console.log('Server running at http://localhost:4010/');
